"use client";
import { z } from "zod";

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
} from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { signUpUser } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
const SignUpForm = () => {
  const router = useRouter();
  const signUpSchema = z.object({
    userName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const user = {
      name: data.userName,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await signUpUser(user);
      if (res.id) {
        toast({
          title: "Success",
          description: "User created successfully",
        });
      }
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Hello, Please Login</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your user name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center">
            <Button
              type="submit"
              className="flex-1"
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <Button
        className="flex-1"
        onClick={() => router.push("/login")}
      >
        Proceed to Log in
      </Button>
    </div>
  );
};

export default SignUpForm;
