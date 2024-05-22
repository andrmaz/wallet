import * as Form from '@radix-ui/react-form'
import type {FormMessageProps} from '@radix-ui/react-form/dist/index'
import './field.css'

interface FieldProps {
  name: string
  label: string
  match?: FormMessageProps['match']
  message?: string
  control?: React.ReactElement
}

export default (props: FieldProps) => (
  <Form.Field className='form-field' name={props.name}>
    <div className='form-heading'>
      <Form.Label className='form-label'>{props.label}</Form.Label>
      <Form.Message className='form-message' match={props.match}>
        {props.message}
      </Form.Message>
    </div>
    <Form.Control asChild={!!props.control}>{props.control}</Form.Control>
  </Form.Field>
)
