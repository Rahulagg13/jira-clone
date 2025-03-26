import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_APPWRITE_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
  },
});
