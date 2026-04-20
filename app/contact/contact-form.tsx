"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = {};

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const msgs = errors?.[field];
  if (!msgs?.length) return null;
  return (
    <p id={`${field}-error`} className="mt-1 text-xs text-oxblood" role="alert">
      {msgs[0]}
    </p>
  );
}

const labelClass = "block text-sm font-medium text-projector mb-1.5";
const inputClass =
  "w-full rounded-lg bg-screening border border-white/15 text-projector placeholder-steel px-3 py-2.5 text-sm focus:outline-none focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors";
const selectClass = `${inputClass} appearance-none`;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledPackage = searchParams.get("package") ?? "";

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, { duration: 8000 });
    }
  }, [state.message]);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" type="text" required autoComplete="name"
          className={inputClass} aria-describedby={state.errors?.name ? "name-error" : undefined} />
        <FieldError errors={state.errors} field="name" />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className={inputClass} aria-describedby={state.errors?.email ? "email-error" : undefined} />
        <FieldError errors={state.errors} field="email" />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="text-steel text-xs font-normal">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>

      {/* Event date */}
      <div>
        <label htmlFor="eventDate" className={labelClass}>
          Event date <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input id="eventDate" name="eventDate" type="date" required
          className={`${inputClass} [color-scheme:dark]`}
          aria-describedby={state.errors?.eventDate ? "eventDate-error" : undefined} />
        <FieldError errors={state.errors} field="eventDate" />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelClass}>
          Event ZIP or city <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input id="location" name="location" type="text" required placeholder="e.g. Canton, MI 48188"
          className={inputClass} aria-describedby={state.errors?.location ? "location-error" : undefined} />
        <FieldError errors={state.errors} field="location" />
      </div>

      {/* Guest count */}
      <div>
        <label htmlFor="guestCount" className={labelClass}>
          Guest count <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <select id="guestCount" name="guestCount" required defaultValue=""
          className={selectClass} aria-describedby={state.errors?.guestCount ? "guestCount-error" : undefined}>
          <option value="" disabled>Select range</option>
          <option value="Under 25">Under 25</option>
          <option value="25 to 75">25 to 75</option>
          <option value="75 to 150">75 to 150</option>
          <option value="150+">150+</option>
        </select>
        <FieldError errors={state.errors} field="guestCount" />
      </div>

      {/* Event type -- no ticketed option */}
      <div>
        <label htmlFor="eventType" className={labelClass}>
          Event type <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <select id="eventType" name="eventType" required defaultValue=""
          className={selectClass} aria-describedby={state.errors?.eventType ? "eventType-error" : undefined}>
          <option value="" disabled>Select type</option>
          <option value="Movie Night">Movie Night</option>
          <option value="Sports Watch Party">Sports Watch Party</option>
          <option value="Gaming Night">Gaming Night</option>
          <option value="Karaoke Night">Karaoke Night</option>
          <option value="Birthday or Graduation">Birthday or Graduation</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate or Community Org">Corporate or Community Org</option>
          <option value="HOA or Neighborhood">HOA or Neighborhood</option>
          <option value="Other Private Event">Other Private Event</option>
        </select>
        <FieldError errors={state.errors} field="eventType" />
      </div>

      {/* Package interest */}
      <div>
        <label htmlFor="packageInterest" className={labelClass}>
          Package interest <span className="text-steel text-xs font-normal">(optional)</span>
        </label>
        <select id="packageInterest" name="packageInterest" defaultValue={prefilledPackage} className={selectClass}>
          <option value="">Not sure</option>
          <option value="Intimate 20 ft">Intimate 20 ft -- starting at $750</option>
          <option value="Community 30 ft">Community 30 ft -- starting at $1,250</option>
          <option value="Indoor Winter">Indoor Winter -- starting at $600</option>
          <option value="Sports Watch Party">Sports Watch Party -- starting at $1,500</option>
          <option value="Gaming Night">Gaming Night -- starting at $1,400</option>
          <option value="Karaoke Night">Karaoke Night -- starting at $900</option>
          <option value="Birthday or Graduation">Birthday or Graduation -- starting at $1,200</option>
          <option value="Elopement / Micro-Wedding">Elopement / Micro-Wedding -- starting at $1,400</option>
          <option value="Wedding Reception Cinema">Wedding Reception Cinema -- starting at $2,200</option>
          <option value="Wedding Full Day">Wedding Full Day -- starting at $3,200</option>
          <option value="Corporate or Community Org">Corporate or Community Org -- starting at $2,200</option>
        </select>
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details" className={labelClass}>
          Tell us about your event <span className="text-steel text-xs font-normal">(optional, 500 chars max)</span>
        </label>
        <textarea id="details" name="details" rows={4} maxLength={500}
          placeholder="Vibe, venue, any special notes..."
          className={`${inputClass} resize-none`}
          aria-describedby={state.errors?.details ? "details-error" : undefined} />
        <FieldError errors={state.errors} field="details" />
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className={labelClass}>
          How did you hear about us? <span className="text-steel text-xs font-normal">(optional)</span>
        </label>
        <input id="referral" name="referral" type="text" className={inputClass} />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input name="_trap" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input id="consent" name="consent" type="checkbox" required value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-screening accent-oxblood focus:ring-oxblood"
            aria-describedby={state.errors?.consent ? "consent-error" : undefined} />
          <label htmlFor="consent" className="text-sm text-steel leading-relaxed cursor-pointer">
            I agree to receive a reply by email or phone.{" "}
            <span className="text-oxblood" aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError errors={state.errors} field="consent" />
      </div>

      {/* Private events confirmation */}
      <div>
        <div className="flex items-start gap-3">
          <input id="privateConfirm" name="privateConfirm" type="checkbox" required value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-screening accent-oxblood focus:ring-oxblood"
            aria-describedby={state.errors?.privateConfirm ? "privateConfirm-error" : undefined} />
          <label htmlFor="privateConfirm" className="text-sm text-steel leading-relaxed cursor-pointer">
            I confirm this event is private, non-ticketed, and will not charge admission.{" "}
            <span className="text-oxblood" aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError errors={state.errors} field="privateConfirm" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
      >
        {isPending ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="text-steel text-xs text-center">
        We respond within 24 hours. Private events only.
      </p>
    </form>
  );
}
