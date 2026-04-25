"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import ProgressIndicator from "./steps/progress-indicator";
import { audioTiers, suggestTier, useCases } from "@/lib/packages";
import MagneticButton from "@/components/magnetic-button";

const initialState: InquiryState = {};

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const msgs = errors?.[field];
  if (!msgs?.length) return null;
  return (
    <p id={`${field}-error`} className="mt-1 text-xs text-ember" role="alert">
      {msgs[0]}
    </p>
  );
}

const labelClass = "mb-2 block max-w-full break-words text-caption text-steel";
const inputClass =
  "min-h-[56px] w-full min-w-0 max-w-full rounded-lg border border-white/10 bg-screening/60 px-4 py-3.5 text-base text-projector placeholder-steel/70 transition-colors hover:border-ember/40 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/40";
const selectClass = `${inputClass} appearance-none`;

type Step = 1 | 2 | 3;

const addOnOptions = [
  "Popcorn machine rental",
  "YouTube karaoke + 2 wireless mics",
  "Retro gaming kit",
  "BYO console hookup",
  "Drone video and photos",
  "Ambient string lighting",
  "Blacklight + Neon Kit",
  "Patio heaters, bug zappers, fans",
  "Backyard games",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledPackage = searchParams.get("package") ?? "";
  const prefilledLocation = searchParams.get("location") ?? "";
  const prefilledEventDate = searchParams.get("eventDate") ?? "";
  const prefilledUseCase = searchParams.get("useCase") ?? "";
  const prefilledEventType = useCases.find((u) => u.slug === prefilledUseCase)?.name ?? "";

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  // URL-synced step + field state so refresh preserves progress and links are shareable.
  const [stepNum, setStep] = useQueryState("step", parseAsInteger.withDefault(1));
  const step = (stepNum >= 1 && stepNum <= 3 ? stepNum : 1) as Step;
  const [eventType, setEventType] = useQueryState("et", parseAsString.withDefault(prefilledEventType));
  const [guestCount, setGuestCount] = useQueryState("guests", parseAsString.withDefault(""));
  const [stepError, setStepErrorState] = useQueryState("err", parseAsString.withDefault(""));
  const setStepError = (v: string | null) => setStepErrorState(v ?? "");

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, { duration: 8000 });
    }
  }, [state.message]);

  // If server returns errors after submit, jump back to the relevant step
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
  }, [state.errors]);

  const suggestion = useMemo(() => {
    if (!eventType) return null;
    // eventType value is the UseCase.name (e.g. "Movie Night"); look up the matching slug.
    const uc = useCases.find((u) => u.name === eventType);
    if (!uc) return null;
    const tier = suggestTier(uc.slug, guestCount);
    return tier
      ? {
          name: tier.name,
          best: tier.best,
          plainBenefit: tier.plainBenefit,
          coverageNote: tier.coverageNote,
        }
      : null;
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
    <form action={formAction} className="min-w-0 space-y-6" noValidate data-dim-beam>
      <ProgressIndicator current={step} labels={["Basics", "Setup", "Contact"]} />

      {/* STEP 1. Event basics */}
      <fieldset className="space-y-6" hidden={step !== 1} aria-hidden={step !== 1}>
        <legend className="sr-only">Event basics</legend>

        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date <span className="text-ember" aria-hidden="true">*</span>
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            defaultValue={prefilledEventDate}
            className={`${inputClass} [color-scheme:dark]`}
            aria-describedby={state.errors?.eventDate ? "eventDate-error" : undefined}
          />
          <FieldError errors={state.errors} field="eventDate" />
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Event ZIP or city <span className="text-ember" aria-hidden="true">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="e.g. Canton, MI 48188"
            defaultValue={prefilledLocation}
            className={inputClass}
            aria-describedby={state.errors?.location ? "location-error" : undefined}
          />
          <FieldError errors={state.errors} field="location" />
        </div>

        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type <span className="text-ember" aria-hidden="true">*</span>
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
        <legend className="sr-only">Setup builder</legend>

        <div>
          <label htmlFor="guestCount" className={labelClass}>
            Guest count <span className="text-ember" aria-hidden="true">*</span>
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
          <div className="min-w-0 overflow-hidden rounded-lg border border-oxblood/40 bg-charcoal/70 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-wider text-ember font-semibold mb-1">
              Recommended setup
            </p>
            <p className="break-words text-base font-heading text-projector">{suggestion.name}</p>
            <p className="mt-2 break-words text-sm leading-relaxed text-silver">
              {suggestion.plainBenefit}
            </p>
            <p className="mt-2 break-words text-xs leading-relaxed text-steel">
              {suggestion.coverageNote} Every event is custom-quoted around date, distance, and add-ons.
            </p>
          </div>
        )}

        <div>
          <label htmlFor="packageInterest" className={labelClass}>
            Package interest <span className="text-steel text-xs font-normal">(optional)</span>
          </label>
          <select id="packageInterest" name="packageInterest" defaultValue={prefilledPackage} className={selectClass}>
            <option value="">Not sure</option>
            {audioTiers.map((tier) => (
              <option key={tier.slug} value={tier.name}>
                {tier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className={labelClass}>
            Add-ons you may want <span className="text-steel text-xs font-normal">(optional)</span>
          </p>
          <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
            {addOnOptions.map((option) => (
              <label
                key={option}
                className="flex min-h-[48px] min-w-0 max-w-full items-start gap-3 overflow-hidden rounded-lg border border-white/10 bg-screening/55 p-3 text-left text-sm leading-snug text-silver transition-colors hover:border-ember/40"
              >
                <input
                  name="addOns"
                  type="checkbox"
                  value={option}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-screening accent-oxblood focus:ring-oxblood"
                />
                <span className="min-w-0 break-words text-left">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* STEP 3. Contact info */}
      <fieldset className="space-y-6" hidden={step !== 3} aria-hidden={step !== 3}>
        <legend className="sr-only">Your contact info</legend>

        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-ember" aria-hidden="true">*</span>
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

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-ember" aria-hidden="true">*</span>
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

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-steel text-xs font-normal">(optional, we reply by text)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="(734) 555-0100"
          />
        </div>

        <div>
          <label htmlFor="details" className={labelClass}>
            Tell us about your event <span className="text-steel text-xs font-normal">(optional, 500 chars max)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            maxLength={500}
            placeholder="Vibe, venue, any special notes..."
            className={`${inputClass} resize-none`}
            aria-describedby={state.errors?.details ? "details-error" : undefined}
          />
          <FieldError errors={state.errors} field="details" />
        </div>

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

        <div>
          <div className="flex min-w-0 items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              value="yes"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-screening accent-oxblood focus:ring-oxblood"
              aria-describedby={state.errors?.consent ? "consent-error" : undefined}
            />
            <label htmlFor="consent" className="min-w-0 cursor-pointer break-words text-sm leading-relaxed text-steel">
              I agree to receive a reply by email, phone, or text.{" "}
              <span className="text-ember" aria-hidden="true">*</span>
            </label>
          </div>
          <FieldError errors={state.errors} field="consent" />
        </div>

        <div>
          <div className="flex min-w-0 items-start gap-3">
            <input
              id="privateConfirm"
              name="privateConfirm"
              type="checkbox"
              required
              value="yes"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/15 bg-screening accent-oxblood focus:ring-oxblood"
              aria-describedby={state.errors?.privateConfirm ? "privateConfirm-error" : undefined}
            />
            <label htmlFor="privateConfirm" className="min-w-0 cursor-pointer break-words text-sm leading-relaxed text-steel">
              I confirm this event is private, non-ticketed, and will not charge admission.{" "}
              <span className="text-ember" aria-hidden="true">*</span>
            </label>
          </div>
          <FieldError errors={state.errors} field="privateConfirm" />
        </div>
      </fieldset>

      {stepError && (
        <p className="text-xs text-ember" role="alert">
          {stepError}
        </p>
      )}

      {/* Step navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex min-h-[48px] min-w-[88px] items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-steel transition-colors hover:border-white/30 hover:text-projector"
          >
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        {step < 3 ? (
          <MagneticButton>
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-[48px] min-w-[104px] items-center justify-center rounded-lg bg-oxblood px-6 py-3 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep"
            >
              Next
            </button>
          </MagneticButton>
        ) : (
          <MagneticButton>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-[48px] min-w-[132px] items-center justify-center rounded-lg bg-oxblood px-6 py-3 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send Inquiry"}
            </button>
          </MagneticButton>
        )}
      </div>

      <p className="text-steel text-xs text-center">
        We respond within 24 hours. Private events only.
      </p>
    </form>
  );
}
