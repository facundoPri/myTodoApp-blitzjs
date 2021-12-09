import { Form, FormProps } from "app/core/components/Form"
import { FormTextInput } from "app/core/components/Forms/FormTextInput"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function TaskForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <FormTextInput name="name" label="Name" placeholder="Name" />
    </Form>
  )
}
