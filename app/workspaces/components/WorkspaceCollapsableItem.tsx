import { Avatar, Collapse, Stack, Tooltip, useDisclosure } from "@chakra-ui/react"
import { useQuery } from "blitz"
import getWorkspace from "../queries/getWorkspace"

const Item = ({ name, onClick }) => (
  <Tooltip label={name} placement="auto">
    <Avatar name={name} onClick={onClick} cursor={"pointer"} />
  </Tooltip>
)

export default function WorkspaceCollapsableItem({ workspaceId }) {
  const [workspace] = useQuery(getWorkspace, { id: workspaceId })

  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack w="min-content" bg="gray" borderRadius={"full"}>
      <Item name={workspace?.name} onClick={onToggle} />
      <Collapse in={isOpen} animateOpacity>
        <Stack>
          {workspace?.projects?.map((project) => (
            <Item key={project?.id} name={project?.name} onClick={onToggle} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}
