import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import {useRegisterUserMutation} from '../../graphql/user'
import {SignupForm} from './Form'
import {Path} from '../../data/routes'
import {useLocale} from '../../hooks/locale'
import {z} from 'zod'
import type {TSignupFormData} from '../../types'
import {TFunction} from 'i18next'

export const SignupFormData = (t: TFunction) =>
  z
    .object({
      name: z
        .string()
        .min(2, {message: t('registration.form.name.error')})
        .max(30),
      email: z.string().email({message: t('registration.form.email.error')}),
      password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: t('registration.form.password.error'),
      }),
    })
    .required()

const initialFormData = {name: '', email: '', password: ''}

export const Signup = () => {
  const {t} = useLocale()
  const navigate = useNavigate()
  const [formData, setFormData] =
    React.useState<TSignupFormData>(initialFormData)
  const [error, setError] = React.useState<string | null>(null)
  const {mutateAsync /* , isError, isPending */} =
    useRegisterUserMutation(formData)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    const result = SignupFormData(t).safeParse(formData)
    if (!result.success) {
      setError(result.error.issues[0].message)
    } else {
      mutateAsync()
        .then(() => navigate(Path.Dashboard))
        .catch(err => {
          if (err instanceof Error) {
            console.error(err)
          } else {
            console.error('Unknown error')
          }
        })
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
