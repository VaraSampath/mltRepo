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
  ageUnit: z.string().min(2).optional(),
  gender: z.string().min(2).optional(),
  phone: z.string().min(10).max(10).optional(),
  village: z.string().min(2).max(150).optional(),
  amount: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  referredBy: z.string().min(2).max(150).optional(),
});

export const normalValuesSchema = z.object({
  _id: z.string().optional(),
  modifiedBy: z.string().min(1).max(250).optional(),
  testGroup: z.string().min(1).max(150),
  name: z.string().min(1).max(150),
  units: z.string().min(1).optional(),
  maleMax: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  maleMin: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  femaleMax: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  femaleMin: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
});

export type PatientSchemaType = z.infer<typeof patientSchema>;
export type NormalValuesSchemaType = z.infer<typeof normalValuesSchema>;
