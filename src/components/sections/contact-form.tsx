'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowUpRight, CheckCircle } from 'lucide-react';
import {
  budgetOptions,
  contactFormSchema,
  serviceOptions,
  type ContactFormData,
} from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Textarea, fieldErrorId } from '@/components/ui/input';
import { siteConfig } from '@/config/site';

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
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: defaultService ?? 'not-sure',
      budget: 'not-sure',
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

      setSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="border-t border-navy/20 pt-10" role="status">
        <CheckCircle className="h-8 w-8 text-navy" aria-hidden="true" />
        <h2 className="mt-6 font-display text-[28px] font-bold leading-[1.05] tracking-[-0.05em] sm:text-[36px]">
          Thanks, we got it.
        </h2>
        <p className="mt-4 max-w-md font-sans text-[15px] leading-[1.55] text-steel">
          We read every message personally and will reply by email. If it&apos;s urgent, write to{' '}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-navy underline underline-offset-4">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <Button variant="ghost" size="sm" className="mt-8 px-0" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-700/40 bg-red-50 px-4 py-3 font-sans text-[13px] text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
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

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="company" label="Company" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Acme Co."
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? fieldErrorId('company') : undefined}
            {...register('company')}
          />
        </Field>

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
      </div>

      <Field id="budget" label="Budget" required error={errors.budget?.message}>
        <Select
          id="budget"
          aria-invalid={errors.budget ? true : undefined}
          aria-describedby={errors.budget ? fieldErrorId('budget') : undefined}
          {...register('budget')}
        >
          {budgetOptions.map((option) => (
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

      <Button type="submit" size="lg" className="w-full sm:w-auto" isLoading={isSubmitting}>
        Send message
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
