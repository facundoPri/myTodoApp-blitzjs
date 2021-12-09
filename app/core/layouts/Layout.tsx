import { Flex, Stack, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"
import SideBar from "../components/SideBar"
import { NextSeo } from "next-seo"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <NextSeo title={title} />
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
