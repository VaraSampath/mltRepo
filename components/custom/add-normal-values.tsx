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
import { normalValuesSchema, NormalValuesSchemaType } from "@/lib/types";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { testGroups } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const AddNormalValues = () => {
  const form = useForm<NormalValuesSchemaType>({
    resolver: zodResolver(normalValuesSchema),
  });

  const { data: session } = useSession();

  const { toast } = useToast();

  const addNormalValuesData = async (
    bodyData: NormalValuesSchemaType
  ): Promise<NormalValuesSchemaType[]> => {
    const res = await fetch("pages/api/normal-values", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    return data;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNormalValuesData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NormalValuesTable"] });
      toast({
        title: "Success",
        description: "Value added successfully",
        variant: "default",
      });
    },
  });

  function onSubmit(values: NormalValuesSchemaType) {
    mutation.mutate({ ...values, modifiedBy: session?.user?.email ?? "" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="testGroup"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="">Test Group</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={onChange}
                    value={value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Test Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {testGroups.map((testGroup) => (
                        <SelectItem
                          key={testGroup.value}
                          value={testGroup.value}
                        >
                          {testGroup.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="">Name</FormLabel>
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
            name="units"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Units</FormLabel>
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
            name="maleMin"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Male Min</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="maleMax"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Male Max</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="femaleMin"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Female Min</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="femaleMax"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Female Max</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddNormalValues;
