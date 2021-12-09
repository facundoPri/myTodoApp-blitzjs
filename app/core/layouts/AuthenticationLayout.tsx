import { Stack, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"

const AuthenticationLayout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <Head>
        <title>{title || "myTodoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack bg={bg} color={color} minH="100vh" m="auto" maxW="500px" mt="20" {...rest}>
        {children}
      </Stack>
    </>
  )
}

export default AuthenticationLayout
