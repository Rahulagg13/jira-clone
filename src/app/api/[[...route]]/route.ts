import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, authHandler, initAuthConfig } from "@hono/auth-js";
import workspacesRoute from "@/server/workspaces";
import authConfig from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { env } from "@/env";

export const runtime = "nodejs";
const getAuthconfig = (c: Context): AuthConfig => {
  return {
    secret: env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
  };
};

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthconfig));
app.use("/auth/*", authHandler());

app.get("/hello", (c) => {
  console.log(getAuthconfig(c));
  return c.json({ hello: "world" });
});

const routes = app.route("/workspaces", workspacesRoute);

export const GET = handle(routes);
export const POST = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes;
