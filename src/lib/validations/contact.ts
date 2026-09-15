import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please provide a valid business email address' }),
  company: z.string().optional(),
  service: z.string().min(1, { message: 'Please select a service of interest' }),
  budget: z.string().min(1, { message: 'Please select your approximate budget range' }),
  message: z
    .string()
    .min(10, { message: 'Please provide more details about your project (at least 10 characters)' })
    .max(2000, { message: 'Message is too long (max 2000 characters)' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
