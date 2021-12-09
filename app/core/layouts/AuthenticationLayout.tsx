import { Stack, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"
import { NextSeo } from "next-seo"

const AuthenticationLayout: BlitzLayout<{ title?: string }> = ({ title, children, ...rest }) => {
  const bg = useColorModeValue("white", "black")
  const color = useColorModeValue("black", "white")

  return (
    <>
      <NextSeo title={title} />
      <Stack bg={bg} color={color} minH="100vh" m="auto" {...rest}>
        {children}
      </Stack>
    </>
  )
}

export default AuthenticationLayout
