import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import {useCreateUserMutation} from '../../graphql/user'
import {SignupForm} from './Form'
import {Path} from '../../data/routes'
import {TSignupFormData, SignupFormData} from '../../types'

const initialFormData = {name: '', email: '', password: ''}

export const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] =
    React.useState<TSignupFormData>(initialFormData)
  const [error, setError] = React.useState<string | null>(null)
  const {mutateAsync} = useCreateUserMutation(formData)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))
  }
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    const result = SignupFormData.safeParse(formData)
    if (!result.success) {
      setError(result.error.issues[0].message)
    } else {
      mutateAsync()
        .then(() => navigate(Path.Dashboard))
        .catch(setError)
    }
  }
  return (
    <SignupForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      errorMessage={error}
    />
  )
}
