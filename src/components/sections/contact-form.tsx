'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import {
  budgetOptions,
  contactFormSchema,
  serviceOptions,
  type ContactFormData,
} from '@/lib/validations/contact';
import { Field, Input, Select, Textarea, fieldErrorId } from '@/components/ui/input';
import { trackEvent } from '@/lib/consent';
import { RollText } from '@/components/ui/roll-text';
import { RollArrow } from '@/components/ui/roll-arrow';

const isServiceOption = (value: string | null): value is string =>
  serviceOptions.some((option) => option.value === value);

export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFields />}>
      <ContactFormWithParams />
    </Suspense>
  );
}

function ContactFormWithParams() {
  const params = useSearchParams();
  const requested = params.get('service');
  return <ContactFormFields defaultService={isServiceOption(requested) ? requested : undefined} />;
}

function ContactFormFields({ defaultService }: { defaultService?: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Stays true after a successful send until /thank-you has loaded, so the button can't be pressed twice.
  const [isRedirecting, setIsRedirecting] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    // Validate a field when the visitor leaves it, then re-check as they type to clear the error.
    // Submitting still validates everything and focuses the first invalid field.
    mode: 'onTouched',
    defaultValues: {
      service: defaultService ?? 'not-sure',
      budget: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'Something went wrong. Please try again.');
      }

      // Count the inquiry in GA4 (standard "generate_lead" event). No personal data: just which
      // service and budget was picked. Does nothing unless the visitor accepted analytics cookies.
      trackEvent('generate_lead', { method: 'contact_form', service: data.service, budget: data.budget });

      // Sent: show the confirmation on its own page (also a clean conversion URL for analytics).
      setIsRedirecting(true);
      router.push('/thank-you');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  // Move focus to a server error (e.g. rate limit, delivery failure) so it's seen and announced.
  useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  const isBusy = isSubmitting || isRedirecting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {submitError && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="flex items-start gap-3 border border-red-700/40 bg-red-50 px-4 py-3 font-sans text-[13px] text-red-800 outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Honeypot: invisible to people, tempting to bots. Clipped in place (not pushed off-screen) so it can never cause sideways scroll. */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0 [clip-path:inset(50%)]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? fieldErrorId('name') : undefined}
            {...register('name')}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? fieldErrorId('email') : undefined}
            {...register('email')}
          />
        </Field>
      </div>

      {/* Company and budget are short, so they can share a row. */}
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="company" label="Company (optional)" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Acme Co."
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? fieldErrorId('company') : undefined}
            {...register('company')}
          />
        </Field>

        <Field id="budget" label="Budget" required error={errors.budget?.message}>
          <Select
            id="budget"
            aria-invalid={errors.budget ? true : undefined}
            aria-describedby={errors.budget ? fieldErrorId('budget') : undefined}
            {...register('budget')}
          >
            <option value="" disabled>
              Select a budget
            </option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {/* Full width: service names like "Cloud Infrastructure & DevOps" were cut off in a half-width field. */}
      <Field id="service" label="What do you need" required error={errors.service?.message}>
        <Select
          id="service"
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? fieldErrorId('service') : undefined}
          {...register('service')}
        >
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="message" label="About the project" required error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          placeholder="What are you building, where is the business today, and what would a win look like?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? fieldErrorId('message') : undefined}
          {...register('message')}
        />
      </Field>

      <button
        type="submit"
        disabled={isBusy}
        aria-busy={isBusy || undefined}
        className="group inline-flex h-11 w-full items-center justify-between gap-4 rounded-[3px] bg-black pl-4 pr-1.5 font-montserrat text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:justify-start"
      >
        <RollText>{isBusy ? 'Sending…' : 'Send message'}</RollText>
        <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white text-black">
          {isBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RollArrow className="h-4 w-4" />
          )}
        </span>
      </button>
    </form>
  );
}
