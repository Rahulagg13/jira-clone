import { Hono } from "hono";
import { handle } from "hono/vercel";

import workspacesRoute from "@/server/workspaces";

const app = new Hono().basePath("/api");

const routes = app.route("/workspaces", workspacesRoute);

export const GET = handle(routes);
export const POST = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes;
