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
    <p id={`${field}-error`} className="mt-1 text-xs text-brand-red" role="alert">
      {msgs[0]}
    </p>
  );
}

const labelClass = "block text-sm font-medium text-brand-white mb-1.5";
const inputClass =
  "w-full rounded-lg bg-brand-black border border-white/15 text-brand-white placeholder-brand-gray px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors";
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
          Name <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        <FieldError errors={state.errors} field="name" />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        <FieldError errors={state.errors} field="email" />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="text-brand-gray text-xs font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      {/* Event date */}
      <div>
        <label htmlFor="eventDate" className={labelClass}>
          Event date <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          required
          className={`${inputClass} [color-scheme:dark]`}
          aria-describedby={state.errors?.eventDate ? "eventDate-error" : undefined}
        />
        <FieldError errors={state.errors} field="eventDate" />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelClass}>
          Event ZIP or city <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          placeholder="e.g. Canton, MI 48188"
          className={inputClass}
          aria-describedby={state.errors?.location ? "location-error" : undefined}
        />
        <FieldError errors={state.errors} field="location" />
      </div>

      {/* Guest count */}
      <div>
        <label htmlFor="guestCount" className={labelClass}>
          Guest count <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <select
          id="guestCount"
          name="guestCount"
          required
          defaultValue=""
          className={selectClass}
          aria-describedby={state.errors?.guestCount ? "guestCount-error" : undefined}
        >
          <option value="" disabled>Select range</option>
          <option value="Under 25">Under 25</option>
          <option value="25 to 75">25 to 75</option>
          <option value="75 to 150">75 to 150</option>
          <option value="150+">150+</option>
        </select>
        <FieldError errors={state.errors} field="guestCount" />
      </div>

      {/* Event type */}
      <div>
        <label htmlFor="eventType" className={labelClass}>
          Event type <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <select
          id="eventType"
          name="eventType"
          required
          defaultValue=""
          className={selectClass}
          aria-describedby={state.errors?.eventType ? "eventType-error" : undefined}
        >
          <option value="" disabled>Select type</option>
          <option value="Movie Night">Movie Night</option>
          <option value="Sports Watch">Sports Watch</option>
          <option value="Gaming">Gaming</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate">Corporate</option>
          <option value="Other">Other</option>
        </select>
        <FieldError errors={state.errors} field="eventType" />
      </div>

      {/* Package interest */}
      <div>
        <label htmlFor="packageInterest" className={labelClass}>
          Package interest{" "}
          <span className="text-brand-gray text-xs font-normal">(optional)</span>
        </label>
        <select
          id="packageInterest"
          name="packageInterest"
          defaultValue={prefilledPackage}
          className={selectClass}
        >
          <option value="">Not sure</option>
          <option value="Basic Cinema">Basic Cinema</option>
          <option value="Standard Cinema">Standard Cinema</option>
          <option value="Premium Cinema">Premium Cinema</option>
          <option value="Gaming Night">Gaming Night</option>
          <option value="Sports Watch Party">Sports Watch Party</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Wedding">Wedding</option>
        </select>
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details" className={labelClass}>
          Tell us about your event{" "}
          <span className="text-brand-gray text-xs font-normal">(optional, 500 chars max)</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          maxLength={500}
          placeholder="Vibe, venue, any special setup notes..."
          className={`${inputClass} resize-none`}
          aria-describedby={state.errors?.details ? "details-error" : undefined}
        />
        <FieldError errors={state.errors} field="details" />
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className={labelClass}>
          How did you hear about us?{" "}
          <span className="text-brand-gray text-xs font-normal">(optional)</span>
        </label>
        <input
          id="referral"
          name="referral"
          type="text"
          className={inputClass}
        />
      </div>

      {/* Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-brand-black accent-brand-red focus:ring-brand-red"
            aria-describedby={state.errors?.consent ? "consent-error" : undefined}
          />
          <label htmlFor="consent" className="text-sm text-brand-gray leading-relaxed cursor-pointer">
            I agree to receive a reply by email or phone.{" "}
            <span className="text-brand-red" aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError errors={state.errors} field="consent" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
      >
        {isPending ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="text-brand-gray text-xs text-center">
        We respond within 24 hours. No spam, no pressure.
      </p>
    </form>
  );
}
