"use client";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { registerValidationSchema } from "@/lib/schema";
import { handleSignUp } from "@/actions/auth/actions";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const SignUpCard = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerValidationSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerValidationSchema),
  });

  const onSubmit = (values: z.infer<typeof registerValidationSchema>) => {
    startTransition(async () => {
      try {
        const response = await handleSignUp(values);
        if (!response?.success) {
          toast.error(response?.message);
          return;
        }
        toast.success("User Signed Up Successfully");
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex justify-center items-center p-4">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-center px-3 mt-2">
          By signing up you agree to our{" "}
          <span className="text-blue-700">Privacy Policy</span> and{" "}
          <span className="text-blue-700">Terms of Service</span>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="px-7 py-2">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
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
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size={"lg"} className="w-full">
              {isPending ? (
                <LoaderCircle className="animate-spin size-5 text-black" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-2 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Register with Google
        </Button>
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Register with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardFooter className="px-7 py-2 flex flex-col gap-y-4">
        <p className="text-neutral-400 text-sm">
          Already Have an Account?
          <Link href={"/sign-in"}>
            <span className="text-blue-700">&nbsp;Login</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
