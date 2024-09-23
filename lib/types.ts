import { z } from "zod";

export const patientSchema = z.object({
  date: z.date(),
  name: z.string().min(2).max(150),
  age: z.number().max(100),
  ageUnit: z.string().min(2).optional(),
  gender: z.string().min(2).optional(),
  phone: z.string().min(10).max(10).optional(),
  village: z.string().min(2).max(150).optional(),
  amount: z
    .number()

    .optional(),
  referredBy: z.string().min(2).max(150).optional(),
  authorId: z.string().min(2).max(150).optional(),
  author: z.string().min(2).max(150).optional(),
});

export const normalValuesSchema = z.object({
  _id: z.string().optional(),
  modifiedBy: z.string().min(1).max(250).optional(),
  testGroup: z.string().min(1).max(150),
  name: z.string().min(1).max(150),
  units: z.string().min(1).optional(),
  maleMax: z
    .number()

    .optional(),
  maleMin: z
    .number()

    .optional(),
  femaleMax: z
    .number()

    .optional(),
  femaleMin: z
    .number()

    .optional(),
});

export type PatientSchemaType = z.infer<typeof patientSchema>;
export type NormalValuesSchemaType = z.infer<typeof normalValuesSchema>;
