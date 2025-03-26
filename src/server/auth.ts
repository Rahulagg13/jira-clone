import NextAuth from "next-auth";
import { env } from "@/env";
import authConfig from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: env.AUTH_SECRET,
  ...authConfig,
});
