import { z } from "zod";

export const patientSchema = z.object({
  date: z.date(),
  name: z.string().min(2).max(150),
  age: z
    .string()
    .max(100)
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  ageUnit: z.string().min(2).max(50).optional(),
  gender: z.string().min(2).max(50).optional(),
  phone: z.string().min(10).max(10).optional(),
  village: z.string().min(2).max(50).optional(),
  amount: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  referredBy: z.string().min(2).max(50).optional(),
});

export const normalValuesSchema = z.object({
  name: z.string().min(2).max(150),
  units: z.string().min(2).max(150).optional(),
  maleMax: z.string().min(2).max(150).optional(),
  maleMin: z.string().min(2).max(150).optional(),
  femaleMax: z.string().min(2).max(150).optional(),
  femaleMin: z.string().min(2).max(150).optional(),
});

export type PatientSchemaType = z.infer<typeof patientSchema>;
export type NormalValuesSchemaType = z.infer<typeof normalValuesSchema>;
