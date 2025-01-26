import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import {useLoginUserMutation, useUserSessionQuery} from '../../graphql/user'
import {useLocale} from '../../hooks/locale'
import {TSigninFormData} from '../../types'
import {TFunction} from 'i18next'
import {z} from 'zod'
import { Path } from '../../data/routes'
import { SigninForm } from './Form'

export const SigninFormData = (t: TFunction) =>
  z
    .object({
      email: z.string().email({message: t('login.form.email.error')}),
      password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: t('login.form.password.error'),
      }),
    })
    .required()

const initialFormData = {email: '', password: ''}

export const Signin = () => {
  const {t} = useLocale()
  const navigate = useNavigate()

  const [formData, setFormData] =
    React.useState<TSigninFormData>(initialFormData)
  const [error, setError] = React.useState<string | null>(null)

  const {refetch} = useUserSessionQuery()
  const {mutateAsync} = useLoginUserMutation(formData)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))
  }
  const signin: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    const result = SigninFormData(t).safeParse(formData)
    if (!result.success) {
      setError(result.error.issues[0].message)
    } else {
      mutateAsync()
        .then(() => {
          refetch()
          navigate(Path.Dashboard)
        })
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
    <SigninForm
      formData={formData}
      onChange={onChange}
      onSubmit={signin}
      errorMessage={error}
    />
  )
}
