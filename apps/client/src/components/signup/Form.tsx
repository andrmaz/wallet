import {Button, Field, Flex, Form} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'
import type {TSignupFormData} from '../../types'

interface SignupFormProps {
  formData: TSignupFormData
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  errorMessage: string | null
}

export const SignupForm = ({
  formData: {name, email, password},
  onChange,
  onSubmit,
  errorMessage,
}: SignupFormProps) => {
  const {t} = useLocale()
  return (
    <Form onSubmit={onSubmit}>
      <fieldset>
        <legend>{t('registration.title')}</legend>
        {errorMessage && <p>{errorMessage}</p>}
        <Field
          name='name'
          label={t('registration.form.name.label')}
          message={t('registration.form.name.error')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='text'
              value={name}
              required
              onChange={onChange}
            />
          }
        />
        <Field
          name='email'
          label={t('registration.form.email.label')}
          message={t('registration.form.email.error')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='email'
              value={email}
              required
              onChange={onChange}
            />
          }
        />
        <Field
          name='password'
          label={t('registration.form.password.label')}
          message={t('registration.form.password.error')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='password'
              value={password}
              required
              onChange={onChange}
            />
          }
        />
        <Flex justify='end'>
          <Button type='submit' variant='soft'>
            {t('registration.form.action.submit')}
          </Button>
        </Flex>
      </fieldset>
    </Form>
  )
}
