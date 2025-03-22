import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createWorkspacesSchema } from "@/lib/schema";
// import { sessionMiddleWare } from "@/lib/session-middleware";
// import { prisma } from "@/lib/prisma";

const app = new Hono().post(
  "/",
  zValidator("json", createWorkspacesSchema),
  //   sessionMiddleWare,
  async (c) => {
    //     const user = c.get("user");
    //     const { name } = c.req.valid("json");
    //     const workspace = await prisma.workspaces.create({
    //       data: {
    //         name,
    //         userId: user.$id,
    //       },
    //     });
    //     console.log(workspace);
    //     return c.json({ data: workspace });
  }
);
export default app;
