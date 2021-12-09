import { Flex, Stack, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"
import SideBar from "../components/SideBar"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <Head>
        <title>{title || "myTodoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg={bg} color={color}>
        <SideBar />
        <Stack bg={bg} color={color} minH="100vh" {...rest}>
          {children}
        </Stack>
      </Flex>
    </>
  )
}

export default Layout
