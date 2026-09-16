import { z } from 'zod';
import { servicesData } from '@/data/services';

export const serviceOptions = [
  ...servicesData.map((service) => ({ value: service.slug, label: service.title })),
  { value: 'not-sure', label: 'Not sure yet' },
];

/**
 * Required: the form starts with no budget selected, so the visitor must pick one.
 * Ranges run back to back with no gaps, and $10K+ catches larger projects.
 */
export const budgetOptions = [
  { value: 'under-2k', label: '< $2K' },
  { value: '2k-5k', label: '$2K – $5K' },
  { value: '5k-10k', label: '$5K – $10K' },
  { value: '10k-plus', label: '> $10K' },
];

const toEnum = (options: { value: string }[]) =>
  options.map((option) => option.value) as [string, ...string[]];

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  company: z.string().trim().max(100, { message: 'Company must not exceed 100 characters' }).optional(),
  service: z.enum(toEnum(serviceOptions), { message: 'Please choose a service' }),
  budget: z.enum(toEnum(budgetOptions), { message: 'Please choose a budget range' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Tell us a little more (at least 10 characters)' })
    .max(2000, { message: 'Message is too long (max 2000 characters)' }),
  /** Honeypot. Hidden from people; the API silently drops submissions that fill it. */
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
