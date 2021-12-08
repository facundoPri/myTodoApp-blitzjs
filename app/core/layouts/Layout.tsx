import { Flex, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <Head>
        <title>{title || "myTodoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" bg={bg} color={color} minH="100vh" {...rest}>
        {children}
      </Flex>
    </>
  )
}

export default Layout
