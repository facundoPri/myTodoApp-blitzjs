import { useRouter, BlitzPage, Routes } from "blitz"
import AuthenticationLayout from "app/core/layouts/AuthenticationLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <AuthenticationLayout title="Sign Up">{page}</AuthenticationLayout>

export default SignupPage
