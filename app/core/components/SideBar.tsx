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
} from "@chakra-ui/react"
import { Link, Routes, useMutation, useParam, useQuery } from "blitz"
import { AddIcon } from "@chakra-ui/icons"
import getWorkspaces from "app/workspaces/queries/getWorkspaces"
import WorkspaceCollapsableItem from "app/workspaces/components/WorkspaceCollapsableItem"

import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

const WorkspacesList = () => {
  const [{ workspaces }] = useQuery(getWorkspaces, {})
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
  return (
    <Stack bg="gray.700" h="100vh" w="min-content" p="3" justifyContent={"space-between"}>
      <Stack>
        <Suspense fallback={<SkeletonCircle size="12" />}>
          <WorkspacesList />
        </Suspense>

        <Link href={Routes.NewWorkspacePage()}>
          <IconButton
            boxSize={12}
            bg="gray.400"
            aria-label="Add Workspace"
            icon={<AddIcon boxSize={5} />}
            borderRadius={"full"}
          />
        </Link>
      </Stack>

      <Suspense fallback={<SkeletonCircle size="12" />}>
        <UserAvatar />
      </Suspense>
    </Stack>
  )
}
