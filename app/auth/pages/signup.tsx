import { useRouter, BlitzPage, Routes } from "blitz"
import AuthenticationLayout from "app/core/layouts/AuthenticationLayout"
import { SignupForm } from "app/auth/components/SignupForm"
import { PageContainer } from "app/core/components/PageContainer"
import { Container } from "@chakra-ui/layout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageContainer centerPage>
      <Container>
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </Container>
    </PageContainer>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <AuthenticationLayout title="Sign Up">{page}</AuthenticationLayout>

export default SignupPage
