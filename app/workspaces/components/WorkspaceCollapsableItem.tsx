import { AddIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Collapse,
  IconButton,
  SkeletonCircle,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react"
import { Link, Routes, useQuery } from "blitz"
import { useEffect } from "react"
import getWorkspace from "../queries/getWorkspace"

const Item = ({ name, onClick, isActive = false, ...rest }) => (
  <Tooltip label={name} placement="auto">
    <Avatar
      name={name}
      onClick={onClick}
      cursor={"pointer"}
      border={isActive ? "2px solid" : ""}
      {...rest}
    />
  </Tooltip>
)

export default function WorkspaceCollapsableItem({ workspaceId, isLink, isActive }) {
  const [workspace] = useQuery(getWorkspace, { id: workspaceId }, { suspense: false })

  const { isOpen, onToggle } = useDisclosure({ isOpen: isActive })

  if (!workspace) return <SkeletonCircle size="12" />

  return (
    <Stack w="min-content" bg="gray.600" borderRadius={"full"}>
      {isLink ? (
        <Link href={Routes.ShowWorkspacePage({ workspaceId: workspaceId })}>
          <Item name={workspace?.name} onClick={onToggle} isActive={isActive} />
        </Link>
      ) : (
        <Item name={workspace?.name} onClick={onToggle} isActive={isActive} />
      )}
      <Collapse in={isOpen} animateOpacity>
        <Stack alignItems={"center"}>
          {workspace?.projects?.map((project) => (
            <Link
              key={project?.id}
              href={Routes.ShowProjectPage({ workspaceId: workspaceId, projectId: project.id })}
            >
              <Item name={project?.name} onClick={onToggle} boxSize="10" />
            </Link>
          ))}

          <Link href={Routes.NewProjectPage({ workspaceId })}>
            <IconButton
              boxSize={10}
              bg="gray.400"
              aria-label="Add Workspace"
              icon={<AddIcon boxSize={5} />}
              borderRadius={"full"}
            />
          </Link>
        </Stack>
      </Collapse>
    </Stack>
  )
}
