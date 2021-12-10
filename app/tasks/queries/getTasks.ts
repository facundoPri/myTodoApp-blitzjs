import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTasksInput
  extends Pick<Prisma.TaskFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTasksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tasks = await db.task.findMany({ where, orderBy })

    return tasks
  }
)
