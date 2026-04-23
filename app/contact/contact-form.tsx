"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import ProgressIndicator from "./steps/progress-indicator";
import { suggestTier, useCases } from "@/lib/packages";

const initialState: InquiryState = {};

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const msgs = errors?.[field];
  if (!msgs?.length) return null;
  return (
    <p id={`${field}-error`} className="mt-1 serial text-tail" role="alert">
      {msgs[0]}
    </p>
  );
}

const labelClass = "block serial text-ink mb-2";
const inputClass =
  "w-full bg-paper border-2 border-ink text-ink px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-tail focus:shadow-[inset_0_0_0_1px_var(--color-tail)] transition-colors";
const selectClass = `${inputClass} appearance-none`;

type Step = 1 | 2 | 3;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledPackage = searchParams.get("package") ?? "";
  const prefilledLocation = searchParams.get("location") ?? "";
  const prefilledEventDate = searchParams.get("eventDate") ?? "";

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  const [stepNum, setStep] = useQueryState("step", parseAsInteger.withDefault(1));
  const step = (stepNum >= 1 && stepNum <= 3 ? stepNum : 1) as Step;
  const [eventType, setEventType] = useQueryState("et", parseAsString.withDefault(""));
  const [guestCount, setGuestCount] = useQueryState("guests", parseAsString.withDefault(""));
  const [stepError, setStepErrorState] = useQueryState("err", parseAsString.withDefault(""));
  const setStepError = (v: string | null) => setStepErrorState(v ?? "");

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, { duration: 8000 });
    }
  }, [state.message]);

  useEffect(() => {
    if (!state.errors) return;
    const fields = Object.keys(state.errors);
    if (fields.some((f) => ["eventDate", "location", "eventType"].includes(f))) {
      setStep(1);
    } else if (fields.some((f) => ["guestCount", "packageInterest"].includes(f))) {
      setStep(2);
    } else {
      setStep(3);
    }
  }, [state.errors, setStep]);

  const suggestion = useMemo(() => {
    if (!eventType) return null;
    const uc = useCases.find((u) => u.name === eventType);
    if (!uc) return null;
    const tier = suggestTier(uc.slug, guestCount);
    return tier ? { name: tier.name, best: tier.best } : null;
  }, [eventType, guestCount]);

  function validateStep(s: Step): string | null {
    if (s === 1) {
      const date = (document.getElementById("eventDate") as HTMLInputElement | null)?.value;
      const location = (document.getElementById("location") as HTMLInputElement | null)?.value;
      const type = (document.getElementById("eventType") as HTMLSelectElement | null)?.value;
      if (!date) return "Pick an event date.";
      if (!location?.trim()) return "Add a ZIP or city.";
      if (!type) return "Choose an event type.";
      return null;
    }
    if (s === 2) {
      const guests = (document.getElementById("guestCount") as HTMLSelectElement | null)?.value;
      if (!guests) return "Pick a guest count.";
      return null;
    }
    if (s === 3) {
      const name = (document.getElementById("name") as HTMLInputElement | null)?.value;
      const email = (document.getElementById("email") as HTMLInputElement | null)?.value;
      const consent = (document.getElementById("consent") as HTMLInputElement | null)?.checked;
      const privateConfirm = (document.getElementById("privateConfirm") as HTMLInputElement | null)?.checked;
      if (!name?.trim()) return "Add your name.";
      if (!email?.trim()) return "Add your email.";
      if (!consent) return "Confirm we can reply by email or phone.";
      if (!privateConfirm) return "Confirm this is a private, non-ticketed event.";
      return null;
    }
    return null;
  }

  function next() {
    const err = validateStep(step);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStep((step + 1) as Step);
  }

  function back() {
    setStepError(null);
    setStep((step - 1) as Step);
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <ProgressIndicator current={step} />

      <div className="border-2 border-ink bg-paper p-6 sm:p-8">
        {/* STEP 1. Event basics */}
        <fieldset className="space-y-6" hidden={step !== 1} aria-hidden={step !== 1}>
          <legend className="serial text-tail mb-4">Reel 1 · Event Basics</legend>

          <div>
            <label htmlFor="eventDate" className={labelClass}>
              Event Date <span className="text-tail">*</span>
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              required
              defaultValue={prefilledEventDate}
              className={inputClass}
              aria-describedby={state.errors?.eventDate ? "eventDate-error" : undefined}
            />
            <FieldError errors={state.errors} field="eventDate" />
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>
              Event ZIP or City <span className="text-tail">*</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="Canton, MI 48188"
              defaultValue={prefilledLocation}
              className={inputClass}
              aria-describedby={state.errors?.location ? "location-error" : undefined}
            />
            <FieldError errors={state.errors} field="location" />
          </div>

          <div>
            <label htmlFor="eventType" className={labelClass}>
              Event Type <span className="text-tail">*</span>
            </label>
            <select
              id="eventType"
              name="eventType"
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className={selectClass}
              aria-describedby={state.errors?.eventType ? "eventType-error" : undefined}
            >
              <option value="" disabled>Select type</option>
              {useCases.map((uc) => (
                <option key={uc.slug} value={uc.name}>{uc.name}</option>
              ))}
              <option value="Other Private Event">Other Private Event</option>
            </select>
            <FieldError errors={state.errors} field="eventType" />
          </div>
        </fieldset>

        {/* STEP 2. Package + guest count */}
        <fieldset className="space-y-6" hidden={step !== 2} aria-hidden={step !== 2}>
          <legend className="serial text-tail mb-4">Reel 2 · Crowd &amp; Rig</legend>

          <div>
            <label htmlFor="guestCount" className={labelClass}>
              Guest Count <span className="text-tail">*</span>
            </label>
            <select
              id="guestCount"
              name="guestCount"
              required
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
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

          {suggestion && (
            <div className="border-l-4 border-tail bg-perf/40 p-4">
              <p className="serial text-tail mb-2">Recommended Setup</p>
              <p className="font-display text-xl uppercase leading-none">
                {suggestion.name}
              </p>
              <p className="font-mono text-xs text-concrete mt-2">
                {suggestion.best}. Every event is custom-quoted.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="packageInterest" className={labelClass}>
              Package Interest <span className="text-concrete normal-case tracking-normal">(optional)</span>
            </label>
            <select id="packageInterest" name="packageInterest" defaultValue={prefilledPackage} className={selectClass}>
              <option value="">Not sure</option>
              <option value="30 ft + Single Speaker">30 ft + Single Speaker</option>
              <option value="30 ft + Two Speakers">30 ft + Two Speakers</option>
              <option value="30 ft + Two Speakers + Death From Below Sub">30 ft + Two Speakers + Sub</option>
            </select>
          </div>
        </fieldset>

        {/* STEP 3. Contact info */}
        <fieldset className="space-y-6" hidden={step !== 3} aria-hidden={step !== 3}>
          <legend className="serial text-tail mb-4">Reel 3 · Who You Are</legend>

          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-tail">*</span>
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
            <FieldError errors={state.errors} field="name" />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-tail">*</span>
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
            <FieldError errors={state.errors} field="email" />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <span className="text-concrete normal-case tracking-normal">(optional, we reply by text)</span>
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(734) 555-0100" />
          </div>

          <div>
            <label htmlFor="details" className={labelClass}>
              Tell Us About Your Event <span className="text-concrete normal-case tracking-normal">(optional, 500 chars max)</span>
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              maxLength={500}
              placeholder="Vibe, venue, any special notes..."
              className={`${inputClass} resize-none`}
            />
            <FieldError errors={state.errors} field="details" />
          </div>

          <div>
            <label htmlFor="referral" className={labelClass}>
              How Did You Hear About Us? <span className="text-concrete normal-case tracking-normal">(optional)</span>
            </label>
            <input id="referral" name="referral" type="text" className={inputClass} />
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input name="_trap" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 accent-tail border-2 border-ink"
              />
              <span className="font-body text-sm text-ink leading-relaxed">
                I agree to receive a reply by email, phone, or text. <span className="text-tail">*</span>
              </span>
            </label>
            <FieldError errors={state.errors} field="consent" />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="privateConfirm"
                name="privateConfirm"
                type="checkbox"
                required
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 accent-tail border-2 border-ink"
              />
              <span className="font-body text-sm text-ink leading-relaxed">
                I confirm this event is private, non-ticketed, and will not charge admission. <span className="text-tail">*</span>
              </span>
            </label>
            <FieldError errors={state.errors} field="privateConfirm" />
          </div>
        </fieldset>
      </div>

      {stepError && (
        <p className="serial text-tail" role="alert">
          {stepError}
        </p>
      )}

      {/* Step navigation */}
      <div className="flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="serial border-2 border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            ← Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="bulb-button"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isPending}
            className="bulb-button disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Admit One · Send"}
          </button>
        )}
      </div>

      <p className="serial text-concrete text-center">
        We respond within 24 hours. Private events only.
      </p>
    </form>
  );
}
