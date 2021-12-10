import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getWorkspaces from "app/workspaces/queries/getWorkspaces"
import WorkspaceCollapsableItem from "app/workspaces/components/WorkspaceCollapsableItem"

export const WorkspacesList = () => {
  const [workspaces] = useQuery(getWorkspaces, {})

  return (
    <div>
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace.id}>
            <Link href={Routes.ShowWorkspacePage({ workspaceId: workspace.id })}>
              <a>{workspace.name}</a>
            </Link>
            <WorkspaceCollapsableItem workspaceId={workspace.id} isLink={true} isActive={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const WorkspacesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Workspaces</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewWorkspacePage()}>
            <a>Create Workspace</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <WorkspacesList />
        </Suspense>
      </div>
    </>
  )
}

WorkspacesPage.authenticate = true
WorkspacesPage.getLayout = (page) => <Layout>{page}</Layout>

export default WorkspacesPage
