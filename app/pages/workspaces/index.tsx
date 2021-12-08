import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getWorkspaces from "app/workspaces/queries/getWorkspaces"

const ITEMS_PER_PAGE = 100

export const WorkspacesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ workspaces, hasMore }] = usePaginatedQuery(getWorkspaces, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace.id}>
            <Link href={Routes.ShowWorkspacePage({ workspaceId: workspace.id })}>
              <a>{workspace.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
