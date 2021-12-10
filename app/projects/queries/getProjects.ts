import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProjectsInput extends Pick<Prisma.ProjectFindManyArgs, "where" | "orderBy"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy }: GetProjectsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const projects = db.project.findMany({ where, orderBy })

  // const workspaces = await db.workspace.findMany({
  //   where: { ownerId: ctx.session.userId, ...where },
  //   orderBy,
  // })

  return projects
})
