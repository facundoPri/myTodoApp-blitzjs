import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const workspaceId = useParam("workspaceId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })

  return (
    <>
      <Head>
        <title>Project {project.id}</title>
      </Head>

      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <Link href={Routes.EditProjectPage({ workspaceId: workspaceId!, projectId: project.id })}>
          <a>Edit</a>
        </Link>

        <button
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
        </button>
      </div>
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  const workspaceId = useParam("workspaceId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.ProjectsPage({ workspaceId: workspaceId! })}>
          <a>Projects</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
