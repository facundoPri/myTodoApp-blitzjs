import { Checkbox, HStack, Skeleton, SkeletonText, Stack, Text, useBoolean } from "@chakra-ui/react"
import { useQuery } from "blitz"
import React, { Suspense } from "react"
import getTask from "../queries/getTask"

export const TaskItem = ({ taskId, initialState = false }) => {
  const [state, setState] = useBoolean(initialState)
  const [task] = useQuery(getTask, { id: taskId })

  return (
    <HStack
      border={"2px solid"}
      borderColor="gray.100"
      borderRadius={"md"}
      boxShadow="sm"
      _hover={{ boxShadow: "md", opacity: 1 }}
      spacing={0}
      w="full"
      cursor="pointer"
      opacity={`${state ? 0.4 : 1}`}
      zIndex={0}
    >
      <Checkbox zIndex={1} p="2" pr="0" isChecked={state} onChange={setState.toggle} />

      <Suspense fallback={<SkeletonText p="2" />}>
        <Text w="full" onClick={() => alert("hello")} p="2">
          {task?.name}
        </Text>
      </Suspense>
    </HStack>
  )
}
