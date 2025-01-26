import {Button, Field, Flex, Form} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'
import type {TSigninFormData} from '../../types'

interface SigninFormProps {
  formData: TSigninFormData
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  errorMessage: string | null
}

export const SigninForm = ({
  formData: {email, password},
  onChange,
  onSubmit,
  errorMessage,
}: SigninFormProps) => {
  const {t} = useLocale()
  return (
    <Form onSubmit={onSubmit}>
      <fieldset>
        <legend>{t('login.title')}</legend>
        {errorMessage && <p>{errorMessage}</p>}
        <Field
          name='email'
          label={t('login.form.email.label')}
          message={t('login.form.email.error')}
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
          label={t('login.form.password.label')}
          message={t('login.form.password.error')}
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
            {t('login.form.action.submit')}
          </Button>
        </Flex>
      </fieldset>
    </Form>
  )
}
