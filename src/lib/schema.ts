import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required").max(256),
});

export const registerValidationSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "username required atleast of 3 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "username required atleast of 8 characters")
    .max(256),
});

export const createWorkspacesSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required"),
});
