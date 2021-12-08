import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createWorkspace from "app/workspaces/mutations/createWorkspace"
import { WorkspaceForm, FORM_ERROR } from "app/workspaces/components/WorkspaceForm"

const NewWorkspacePage: BlitzPage = () => {
  const router = useRouter()
  const [createWorkspaceMutation] = useMutation(createWorkspace)

  return (
    <div>
      <h1>Create New Workspace</h1>

      <WorkspaceForm
        submitText="Create Workspace"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateWorkspace}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const workspace = await createWorkspaceMutation(values)
            router.push(Routes.ShowWorkspacePage({ workspaceId: workspace.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.WorkspacesPage()}>
          <a>Workspaces</a>
        </Link>
      </p>
    </div>
  )
}

NewWorkspacePage.authenticate = true
NewWorkspacePage.getLayout = (page) => <Layout title={"Create New Workspace"}>{page}</Layout>

export default NewWorkspacePage
