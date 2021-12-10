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
import getProjects from "app/projects/queries/getProjects"

export const ProjectsList = () => {
  const workspaceId = useParam("workspaceId", "number")
  const [projects] = useQuery(getProjects, {
    where: { workspace: { id: workspaceId! } },
  })

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={Routes.ShowProjectPage({ workspaceId: workspaceId!, projectId: project.id })}
            >
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProjectsPage: BlitzPage = () => {
  const workspaceId = useParam("workspaceId", "number")

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProjectPage({ workspaceId: workspaceId! })}>
            <a>Create Project</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = true
ProjectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProjectsPage
