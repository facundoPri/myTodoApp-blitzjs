import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteWorkspace = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteWorkspace),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const workspace = await db.workspace.deleteMany({ where: { id } })

    return workspace
  }
)
