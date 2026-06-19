import { z } from 'zod';

export const enquirySchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .trim(),
  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit mobile number')
    .trim(),
  age: z
    .number()
    .min(8, 'Age must be at least 8 years')
    .max(14, 'Age must be at most 14 years')
    .optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
