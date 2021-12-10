import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  usePaginatedQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
import { Button, Heading, HStack, Icon, Input, Stack, Text, useBoolean } from "@chakra-ui/react"
import { TaskItem } from "app/tasks/components/TaskItem"
import getTasks from "app/tasks/queries/getTasks"
import { AddIcon } from "@chakra-ui/icons"
import createTask from "app/tasks/mutations/createTask"
import { TaskForm, FORM_ERROR } from "app/tasks/components/TaskForm"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const workspaceId = useParam("workspaceId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })

  const [addTask, setAddTask] = useBoolean(false)

  const [createTaskMutation] = useMutation(createTask)
  const [tasks, { setQueryData }] = useQuery(
    getTasks,
    {
      where: { project: { id: projectId! } },
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <>
      <Head>
        <title>Project | {project.name}</title>
      </Head>

      <Stack h="full" overflowY={"auto"}>
        <HStack justify="space-between">
          <Heading>Project {project.name}</Heading>

          <Link href={Routes.EditProjectPage({ workspaceId: workspaceId!, projectId: project.id })}>
            <a>Edit</a>
          </Link>

          <Button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteProjectMutation({ id: project.id })
                router.push(Routes.ProjectsPage({ workspaceId: workspaceId! }))
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </Button>
        </HStack>

        <Stack>
          {tasks?.map((task) => (
            <TaskItem key={task.id} taskId={task.id} />
          ))}

          {addTask ? (
            <TaskForm
              // submitText="Create Task"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateTask}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const task = await createTaskMutation({ ...values, projectId: projectId! })
                  await setQueryData([...tasks, task])
                  setAddTask.off()
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          ) : (
            <Button leftIcon={<AddIcon />} onClick={setAddTask.on}>
              <Text>Add Task</Text>
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  const workspaceId = useParam("workspaceId", "number")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Project />
    </Suspense>
  )
}

ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
