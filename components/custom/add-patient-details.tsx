"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "../ui/date-picker";
import PatientsTable from "./patients-table";

const formSchema = z.object({
  date: z.date(),
  name: z.string().min(2).max(50).optional(),
  age: z.number().min(1).max(100).optional(),
  ageUnit: z.string().min(2).max(50).optional(),
  gender: z.string().min(2).max(50).optional(),
  phone: z.string().min(10).max(10).optional(),
  village: z.string().min(2).max(50).optional(),
  amount: z.number().min(1).optional(),
  refferedBy: z.string().min(2).max(50).optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const AddPatientDetails = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <PatientsTable />
    </>
  );
};

export default AddPatientDetails;
