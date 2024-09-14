"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../ui/date-picker";
import PatientsTable from "./patients-table";
import { patientSchema, PatientSchemaType } from "@/lib/types";
import { Input } from "../ui/input";
import { doctors } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/lib/actions";
import { useSession } from "next-auth/react";

const AddPatientDetails = () => {
  const form = useForm<PatientSchemaType>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { data: session } = useSession();

  const addPatientsData = async (bodyData: PatientSchemaType) => {
    const res = await createPatient({
      ...bodyData,
      author: { connect: { id: session?.user?.id as string } },
    });
    return { id: res.id };
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addPatientsData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientsTable"] });
    },
  });

  function onSubmit(values: PatientSchemaType) {
    mutation.mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="mt-1.5">Date</FormLabel>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => onChange(Number(e.target.value))}
                      max={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ageUnit"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Age Unit</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={onChange}
                      value={value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Age Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={onChange}
                      value={value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={value}
                      onChange={onChange}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="village"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Village</FormLabel>
                  <FormControl>
                    <Input
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      value={value}
                      onChange={(e) => onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referredBy"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Referred By</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={onChange}
                      value={value}
                      defaultValue="Dr. Smith"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.name}
                          >
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <PatientsTable />
    </>
  );
};

export default AddPatientDetails;
