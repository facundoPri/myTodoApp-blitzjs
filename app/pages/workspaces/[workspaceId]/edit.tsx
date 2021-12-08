import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getWorkspace from "app/workspaces/queries/getWorkspace"
import updateWorkspace from "app/workspaces/mutations/updateWorkspace"
import { WorkspaceForm, FORM_ERROR } from "app/workspaces/components/WorkspaceForm"

export const EditWorkspace = () => {
  const router = useRouter()
  const workspaceId = useParam("workspaceId", "number")
  const [workspace, { setQueryData }] = useQuery(
    getWorkspace,
    { id: workspaceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateWorkspaceMutation] = useMutation(updateWorkspace)

  return (
    <>
      <Head>
        <title>Edit Workspace {workspace.id}</title>
      </Head>

      <div>
        <h1>Edit Workspace {workspace.id}</h1>
        <pre>{JSON.stringify(workspace, null, 2)}</pre>

        <WorkspaceForm
          submitText="Update Workspace"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateWorkspace}
          initialValues={workspace}
          onSubmit={async (values) => {
            try {
              const updated = await updateWorkspaceMutation({
                id: workspace.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowWorkspacePage({ workspaceId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditWorkspacePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditWorkspace />
      </Suspense>

      <p>
        <Link href={Routes.WorkspacesPage()}>
          <a>Workspaces</a>
        </Link>
      </p>
    </div>
  )
}

EditWorkspacePage.authenticate = true
EditWorkspacePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditWorkspacePage
