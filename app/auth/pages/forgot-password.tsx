import { BlitzPage, Head, useMutation } from "blitz"
import AuthenticationLayout from "app/core/layouts/AuthenticationLayout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { Heading, Stack, Text } from "@chakra-ui/react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Stack>
      <Heading>Forgot your password?</Heading>

      {isSuccess ? (
        <Stack>
          <Heading size="sm">Request Submitted</Heading>
          <Text>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </Text>
        </Stack>
      ) : (
        <Form
          submitText="Send Reset Password Instructions"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error: any) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </Stack>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <AuthenticationLayout title="Forgot Your Password?">{page}</AuthenticationLayout>
)

export default ForgotPasswordPage
