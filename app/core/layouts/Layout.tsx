import { Flex, Stack, useColorModeValue } from "@chakra-ui/react"
import { BlitzLayout } from "blitz"
import SideBar from "../components/SideBar"
import { NextSeo } from "next-seo"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <NextSeo title={title} />
      <Flex bg={bg} color={color} w="full">
        <SideBar />
        <Stack bg={bg} color={color} h="100vh" w="full" {...rest}>
          {children}
        </Stack>
      </Flex>
    </>
  )
}

export default Layout
