import * as Form from '@radix-ui/react-form'
import {Button} from '../button'
import type {ButtonProps} from '../button/Button'

interface SubmitProps extends ButtonProps {}

export default (props: SubmitProps) => {
  return (
    <Form.Submit asChild>
      <Button style={{marginTop: 10}}>{props.children}</Button>
    </Form.Submit>
  )
}
