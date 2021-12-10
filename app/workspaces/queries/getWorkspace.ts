import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetWorkspace = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetWorkspace),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const workspace = await db.workspace.findFirst({
      where: {
        id: id,
        ownerId: ctx.session.userId,
      },
      include: { projects: true },
    })

    if (!workspace) throw new NotFoundError()

    return workspace
  }
)
