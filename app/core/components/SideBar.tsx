import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { Link, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { AddIcon } from "@chakra-ui/icons"
import getWorkspaces from "app/workspaces/queries/getWorkspaces"
import WorkspaceCollapsableItem from "app/workspaces/components/WorkspaceCollapsableItem"

import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

import { Modal } from "./Modal"
import { WorkspaceForm, FORM_ERROR } from "app/workspaces/components/WorkspaceForm"
import createWorkspace from "app/workspaces/mutations/createWorkspace"

const CreateWorkspaceModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [createWorkspaceMutation] = useMutation(createWorkspace)
  const [workspaces, { setQueryData }] = useQuery(
    getWorkspaces,
    {},
    {
      staleTime: Infinity,
    }
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create new Workspace">
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
            await setQueryData([...workspaces, workspace])
            router.push(Routes.ShowWorkspacePage({ workspaceId: workspace.id }))
            onClose()
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Modal>
  )
}

const WorkspacesList = () => {
  const [workspaces] = useQuery(getWorkspaces, {})
  const workspaceId = useParam("workspaceId", "number")

  return (
    <>
      {workspaces?.map((workspace) => (
        <WorkspaceCollapsableItem
          key={workspace.id}
          workspaceId={workspace.id}
          isLink={true}
          isActive={workspaceId == workspace.id}
        />
      ))}
    </>
  )
}

const UserAvatar = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (!currentUser) return <SkeletonCircle size="12" />
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar name={currentUser?.name || currentUser?.email} />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default function SideBar() {
  const { isOpen, onClose, onToggle } = useDisclosure()

  return (
    <Stack bg="gray.700" h="100vh" w="min-content" p="3" justifyContent={"space-between"}>
      <Stack>
        <Suspense fallback={<SkeletonCircle size="12" />}>
          <WorkspacesList />
        </Suspense>

        {/* <Link href={Routes.NewWorkspacePage()}> */}
        <IconButton
          boxSize={12}
          bg="gray.400"
          aria-label="Add Workspace"
          icon={<AddIcon boxSize={5} />}
          borderRadius={"full"}
          onClick={onToggle}
        />
        {/* </Link> */}
      </Stack>
      <Suspense fallback="hello">
        <CreateWorkspaceModal isOpen={isOpen} onClose={onClose} />
      </Suspense>
      <Suspense fallback={<SkeletonCircle size="12" />}>
        <UserAvatar />
      </Suspense>
    </Stack>
  )
}
