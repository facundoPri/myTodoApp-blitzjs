import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTodo = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTodo),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const todo = await db.todo.update({ where: { id }, data })

    return todo
  }
)
