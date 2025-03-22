"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/server/auth";
import { prisma } from "@/lib/prisma";
import { loginValidationSchema, registerValidationSchema } from "@/lib/schema";

export const handleLogout = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    throw error;
  }
};
export const handleSignIn = async (
  values: z.infer<typeof loginValidationSchema>
) => {
  try {
    await signIn("credentials", { ...values, redirect: false });
    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "Invalid credentials",
        };
      } else {
        return {
          success: false,
          message: "something went wrong",
        };
      }
    }
    throw error;
  }
};

export const handleSignUp = async (
  values: z.infer<typeof registerValidationSchema>
) => {
  try {
    const { username, email, password } = values;
    const validateValues = registerValidationSchema.safeParse(values);
    if (!validateValues.success) {
      return { success: false, message: "Invalid data." };
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Login to continue.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    if (!user) {
      return {
        success: false,
        message: "something went wrong",
      };
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "Invalid credentials",
        };
      } else {
        return {
          success: false,
          message: "something went wrong",
        };
      }
    } else if (error instanceof z.ZodError) {
      console.log(error.issues);
      return {
        success: false,
        message: "Invalid input format",
        errors: error.format(),
      };
    }
    throw error;
  }
};
