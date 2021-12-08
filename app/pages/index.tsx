import { Suspense } from "react"
import { Link as BlitzLink, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Button, Code, Flex, Link, Stack, Text } from "@chakra-ui/react"
import DarkModeSwitch from "app/core/components/DarkModeSwitch"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <Stack>
          <Text>
            User id: <Code>{currentUser.id}</Code>
          </Text>
          <Text>
            User role: <Code>{currentUser.role}</Code>
          </Text>
        </Stack>
      </>
    )
  } else {
    return (
      <Stack>
        <BlitzLink href={Routes.SignupPage()}>
          <Link>
            <strong>Sign Up</strong>
          </Link>
        </BlitzLink>
        <BlitzLink href={Routes.LoginPage()}>
          <Link>
            <strong>Login</strong>
          </Link>
        </BlitzLink>
      </Stack>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <DarkModeSwitch />
      <Flex>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </Flex>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
