import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";

import { createWorkspacesSchema } from "@/lib/schema";
import { prisma } from "@/lib/prisma";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const workspaces = await prisma.workspaces.findMany({});

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    verifyAuth(),
    zValidator("json", createWorkspacesSchema),
    async (c) => {
      try {
        const auth = c.get("authUser");
        if (!auth || !auth.session || !auth.session.user) {
          return c.json({ success: false, message: "Unauthorized" }, 401);
        }

        const { name, image } = c.req.valid("json");

        let imageUrl: string | null = null;
        if (typeof image === "string") {
          imageUrl = image;
        }
        await prisma.workspaces.create({
          data: {
            name,
            image: imageUrl,
            createdBy: auth.session.user.id as string,
          },
        });
        return c.json(
          {
            success: true,
            message: "Workspace created successfully",
          },
          200
        );
      } catch (error) {
        console.log(error);
        return c.json(
          {
            success: false,
            message: "something went wrong. workspace not created",
          },
          500
        );
      }
    }
  );
export default app;
