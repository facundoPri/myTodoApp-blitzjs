import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetWorkspacesInput
  extends Pick<Prisma.WorkspaceFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy }: GetWorkspacesInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const workspaces = await db.workspace.findMany({
      where: { ownerId: ctx.session.userId, ...where },
      orderBy,
    })

    return workspaces
  }
)
