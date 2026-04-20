"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Event location is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  eventType: z.string().min(1, "Event type is required"),
  packageInterest: z.string().optional(),
  details: z.string().max(500).optional(),
  referral: z.string().optional(),
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

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    eventDate: formData.get("eventDate") as string,
    location: formData.get("location") as string,
    guestCount: formData.get("guestCount") as string,
    eventType: formData.get("eventType") as string,
    packageInterest: formData.get("packageInterest") as string,
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
  } else {
    console.log("RESEND_API_KEY not set. Inquiry:\n", emailBody);
  }

  redirect("/thanks");
}
