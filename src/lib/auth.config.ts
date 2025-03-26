import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { loginValidationSchema } from "./schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        //validate credentials using zod
        const validateCredentials =
          loginValidationSchema.safeParse(credentials);
        if (!validateCredentials.success) {
          return null;
        }
        //find user in db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user || !user.password) {
          return null;
        }

        //add login of compare password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        //if password match return user
        return isPasswordValid ? user : null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return null;
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (!user) return null;
      token.name = user.username;
      token.username = user.username;
      token.createdAt = user.createdAt;
      token.updatedAt = user.updatedAt;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.username = token.username as string;
        session.user.createdAt = token.createdAt as Date;
        session.user.updatedAt = token.updatedAt as Date;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
