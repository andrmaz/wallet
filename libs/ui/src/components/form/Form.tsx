import * as Form from '@radix-ui/react-form'
import './form.css'
import React from 'react'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export default (props: FormProps) => (
  <Form.Root className='form-root' {...props} />
)
