import { z } from 'zod';

export const tripDetailsSchema = z.object({
  country: z.string().min(1, 'Please select a destination'),
  visaType: z.string().min(1, 'Please select a visa type'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type TripDetailsFormType = z.infer<typeof tripDetailsSchema>;



export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter a valid address'),
  dob: z.string().refine(
    (val) => new Date(val) < new Date(),
    { message: 'Date of birth must be in the past' }
  ),
  gender: z.string().min(1, 'Gender is required'),
  passportNumber: z.string().min(5, 'Enter a valid passport number'),
  passportExpiry: z.string().refine(
    (val) => new Date(val) > new Date(),
    { message: 'Passport expiry must be in the future' }
  ),
  nationality: z.string().min(1, 'Nationality is required'),
});

export type PersonalInfoFormType = z.infer<typeof personalInfoSchema>;
