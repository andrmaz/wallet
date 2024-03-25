import * as Form from '@radix-ui/react-form'
import './form.css'

interface FormProps extends React.PropsWithChildren {}

export default (props: FormProps) => (
  <Form.Root className='form-root' {...props} />
)
