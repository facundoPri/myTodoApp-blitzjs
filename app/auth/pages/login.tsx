import { useRouter, BlitzPage } from "blitz"
import AuthenticationLayout from "app/core/layouts/AuthenticationLayout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Box } from "@chakra-ui/react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </Box>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <AuthenticationLayout title="Log In">{page}</AuthenticationLayout>

export default LoginPage
