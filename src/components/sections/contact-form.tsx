'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { FadeIn } from '@/components/animations/fade-in';
import { CheckCircle, Send, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: 'Full-Stack Web Development',
      budget: '$5,000 - $15,000',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message. Please try again.');
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
      {isSuccess ? (
        <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Project Inquiry Received!</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Thank you for reaching out. A senior partner from Webloop Studio will review your project requirements and get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="rounded-full mt-4"
          >
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Name *
              </label>
              <Input
                placeholder="Sarah Connor"
                {...register('name')}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Business Email *
              </label>
              <Input
                type="email"
                placeholder="sarah@company.com"
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company / Organization
              </label>
              <Input
                placeholder="Acme Innovations"
                {...register('company')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Service Needed *
              </label>
              <select
                className="flex h-11 w-full rounded-xl border border-white/10 bg-secondary/50 px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                {...register('service')}
              >
                <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                <option value="AI & Automation Systems">AI & Automation Systems</option>
                <option value="Cross-Platform Mobile Apps">Cross-Platform Mobile Apps</option>
                <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                <option value="Digital Branding">Digital Branding & Identity</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated Budget *
            </label>
            <select
              className="flex h-11 w-full rounded-xl border border-white/10 bg-secondary/50 px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              {...register('budget')}
            >
              <option value="<$5,000">&lt; $5,000 (Sprint MVP)</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000 (Standard Project)</option>
              <option value="$15,000 - $35,000">$15,000 - $35,000 (Scale & Enterprise)</option>
              <option value="$35,000+">$35,000+ (Comprehensive Studio Retainer)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Project Scope & Goals *
            </label>
            <Textarea
              placeholder="Tell us about what you want to build, target launch dates, existing architecture, and key deliverables..."
              rows={4}
              {...register('message')}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="glow"
            size="lg"
            className="w-full rounded-xl gap-2 font-semibold text-base"
            isLoading={isSubmitting}
          >
            <Send className="h-4 w-4" />
            Submit Project Inquiry
          </Button>
        </form>
      )}
    </div>
  );
}
