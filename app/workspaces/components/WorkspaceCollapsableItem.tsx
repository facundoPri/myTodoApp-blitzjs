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
import { Link, Routes, useMutation, useQuery, useRouter } from "blitz"
import getWorkspace from "../queries/getWorkspace"

import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { Modal } from "app/core/components/Modal"
import getProjects from "app/projects/queries/getProjects"

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

const CreateProjectModal = ({ isOpen, onClose, workspaceId }) => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)
  const [projects, { setQueryData }] = useQuery(
    getProjects,
    {
      where: { workspace: { id: workspaceId! } },
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create new Project">
      <ProjectForm
        submitText="Create Project"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProject}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation({ ...values, workspaceId: workspaceId! })
            await setQueryData([...projects, project])
            router.push(
              Routes.ShowProjectPage({ workspaceId: workspaceId!, projectId: project.id })
            )
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

export default function WorkspaceCollapsableItem({ workspaceId, isLink, isActive }) {
  const [workspace] = useQuery(getWorkspace, { id: workspaceId }, { suspense: false })
  const [projects] = useQuery(getProjects, {
    where: { workspace: { id: workspaceId! } },
  })

  const { isOpen, onToggle } = useDisclosure({ isOpen: isActive })
  const { isOpen: isModalOpen, onToggle: onToggleModal, onClose: onCloseModal } = useDisclosure()

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
          {projects?.map((project) => (
            <Link
              key={project?.id}
              href={Routes.ShowProjectPage({ workspaceId: workspaceId, projectId: project.id })}
            >
              <Item name={project?.name} onClick={onToggle} boxSize="10" />
            </Link>
          ))}

          <IconButton
            boxSize={10}
            bg="gray.400"
            aria-label="Add Workspace"
            icon={<AddIcon boxSize={5} />}
            borderRadius={"full"}
            onClick={onToggleModal}
          />
        </Stack>
        <CreateProjectModal isOpen={isModalOpen} onClose={onCloseModal} workspaceId={workspaceId} />
      </Collapse>
    </Stack>
  )
}
