import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateWorkspace = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateWorkspace),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const workspace = await db.workspace.update({ where: { id }, data })

    return workspace
  }
)
