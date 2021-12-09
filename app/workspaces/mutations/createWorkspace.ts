import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateWorkspace = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateWorkspace),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const data = {
      ...input,
      ownerId: ctx.session.userId,
    }
    const workspace = await db.workspace.create({ data: data })

    return workspace
  }
)
