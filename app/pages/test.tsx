import Layout from "app/core/layouts/Layout"
import { Stack } from "@chakra-ui/react"
import { BlitzPage } from "blitz"

const Test: BlitzPage = () => {
  return <Stack p="6" w="full"></Stack>
}

Test.suppressFirstRenderFlicker = true
Test.getLayout = (page) => <Layout title="Test">{page}</Layout>

export default Test
