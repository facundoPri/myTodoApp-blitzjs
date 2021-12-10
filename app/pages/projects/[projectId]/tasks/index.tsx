import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  useParam,
  BlitzPage,
  Routes,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getTasks from "app/tasks/queries/getTasks"

export const TasksList = () => {
  const projectId = useParam("projectId", "number")
  const [tasks] = useQuery(getTasks, {
    where: { project: { id: projectId! } },
  })

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link href={Routes.ShowTaskPage({ projectId: projectId!, taskId: task.id })}>
              <a>{task.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const TasksPage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTaskPage({ projectId: projectId! })}>
            <a>Create Task</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </div>
    </>
  )
}

TasksPage.authenticate = true
TasksPage.getLayout = (page) => <Layout>{page}</Layout>

export default TasksPage
