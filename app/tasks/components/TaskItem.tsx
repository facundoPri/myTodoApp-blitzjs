import { Button, Checkbox, HStack, SkeletonText, Text, useBoolean } from "@chakra-ui/react"
import { useMutation, useQuery } from "blitz"
import React, { Suspense } from "react"
import deleteTask from "../mutations/deleteTask"
import getTask from "../queries/getTask"
import updateTask from "app/tasks/mutations/updateTask"
import { FORM_ERROR } from "app/tasks/components/TaskForm"

export const TaskItem = ({ taskId }) => {
  const [task, { setQueryData }] = useQuery(getTask, { id: taskId })
  const [updateTaskMutation] = useMutation(updateTask)
  const [deleteTaskMutation] = useMutation(deleteTask)

  if (!task) return null

  async function handleOnCheck() {
    try {
      if (!task) return null
      const updated = await updateTaskMutation({
        ...task,
        id: task?.id,
        checked: !task.checked,
      })
      await setQueryData(updated)
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <HStack
      _hover={{ bg: "gray.100" }}
      spacing={0}
      w="full"
      cursor="pointer"
      opacity={`${task.checked ? 0.4 : 1}`}
      zIndex={0}
    >
      <Checkbox
        borderRadius="full"
        zIndex={1}
        p="2"
        pr="0"
        isChecked={task.checked}
        onChange={handleOnCheck}
      />

      <Suspense fallback={<SkeletonText p="2" />}>
        <Text w="full" onClick={() => alert("hello")} p="2">
          {task?.name}
        </Text>
      </Suspense>

      <Button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTaskMutation({ id: task.id })
          }
        }}
        style={{ marginLeft: "0.5rem" }}
      >
        Delete
      </Button>
    </HStack>
  )
}
