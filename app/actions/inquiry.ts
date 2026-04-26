"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import { getClientIp, inquiryLimit, verifyTurnstile } from "@/lib/rate-limit";

const noNewlines = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name too long").transform(noNewlines),
  email: z.string().email("Valid email required").max(254),
  phone: z.string().max(40).optional(),
  eventDate: z
    .string()
    .min(1, "Event date is required")
    .max(40)
    .transform(noNewlines),
  location: z.string().min(1, "Event location is required").max(200),
  guestCount: z.string().min(1, "Guest count is required").max(40),
  eventType: z.string().min(1, "Event type is required").max(80),
  packageInterest: z.string().max(80).optional(),
  addOns: z.string().max(800).optional(),
  details: z.string().max(500).optional(),
  referral: z.string().max(120).optional(),
  consent: z.string().min(1, "Consent is required"),
  privateConfirm: z.literal("yes", { message: "You must confirm this is a private, non-ticketed event" }),
});

export type InquiryState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  // Honeypot check
  if (formData.get("_trap")) return { message: "Submission rejected." };

  // Rate-limit by IP (Upstash when env vars set; in-memory fallback otherwise).
  const h = await headers();
  const ip = getClientIp({ headers: h });
  const rl = await inquiryLimit(ip);
  if (!rl.ok) {
    return {
      message: `Too many inquiries from your network. Try again in about ${rl.retryAfter ?? 60} seconds.`,
    };
  }

  // Cloudflare Turnstile verification. No-op until CLOUDFLARE_TURNSTILE_SECRET
  // is set; once set, the contact form must submit a "cf-turnstile-response".
  const captcha = await verifyTurnstile(formData.get("cf-turnstile-response") as string | null, ip);
  if (!captcha.ok) {
    return { message: "Captcha verification failed. Please retry the challenge." };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    eventDate: formData.get("eventDate") as string,
    location: formData.get("location") as string,
    guestCount: formData.get("guestCount") as string,
    eventType: formData.get("eventType") as string,
    packageInterest: formData.get("packageInterest") as string,
    addOns: formData.getAll("addOns").join(", "),
    details: formData.get("details") as string,
    referral: formData.get("referral") as string,
    consent: formData.get("consent") as string,
    privateConfirm: formData.get("privateConfirm") as string,
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  const emailBody = `
New Inquiry - After Dusk Events (PRIVATE EVENT CONFIRMED)
==========================================================

Name:          ${data.name}
Email:         ${data.email}
Phone:         ${data.phone || "Not provided"}
Event Date:    ${data.eventDate}
Location:      ${data.location}
Guest Count:   ${data.guestCount}
Event Type:    ${data.eventType}
Package:       ${data.packageInterest || "Not specified"}
Add-ons:       ${data.addOns || "None selected"}
Referral:      ${data.referral || "Not provided"}

Details:
${data.details || "None provided"}

==========================================================
Private event confirmed: YES
Submitted: ${new Date().toISOString()}
`.trim();

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "After Dusk Events <noreply@afterduskevents.com>",
        to: "hello@afterduskevents.com",
        replyTo: data.email,
        subject: `New inquiry from ${data.name} - ${data.eventDate}`,
        text: emailBody,
      });
    } catch (err) {
      console.error("Resend error:", err);
      return {
        message: "There was a problem sending your inquiry. Please try again or email us directly at hello@afterduskevents.com.",
      };
    }
  } else if (process.env.NODE_ENV === "production") {
    // In prod, missing key is a real failure — silent redirect would lose
    // the lead without the team ever seeing it.
    return {
      message: "Email service is temporarily unavailable. Please email us directly at hello@afterduskevents.com.",
    };
  } else {
    console.log("RESEND_API_KEY not set. Inquiry:\n", emailBody);
  }

  redirect("/thanks");
}
