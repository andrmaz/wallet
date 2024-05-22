import {Button, Field, Flex, Form} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'
import type {TSignupFormData} from '../../types'

interface SignupFormProps {
  formData: TSignupFormData
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.MouseEventHandler<HTMLButtonElement>
  errorMessage: string | null
}

export const SignupForm = ({
  formData,
  onChange,
  onSubmit,
  errorMessage,
}: SignupFormProps) => {
  const {t} = useLocale()
  return (
    <Form>
      <fieldset>
        <legend>{t('registration.title')}</legend>
        {errorMessage && <p>{errorMessage}</p>}
        <Field
          name='name'
          label={t('registration.form.name.label')}
          message={t('registration.form.name.message')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='text'
              value={formData.name}
              required
              onChange={onChange}
            />
          }
        />
        <Field
          name='email'
          label={t('registration.form.email.label')}
          message={t('registration.form.email.message')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='email'
              value={formData.email}
              required
              onChange={onChange}
            />
          }
        />
        <Field
          name='password'
          label={t('registration.form.password.label')}
          message={t('registration.form.password.message')}
          match='valueMissing'
          control={
            <input
              className='input'
              type='password'
              value={formData.password}
              required
              onChange={onChange}
            />
          }
        />
        <Flex justify='end'>
          <Button variant='soft' onClick={onSubmit}>
            {t('registration.form.action.submit')}
          </Button>
        </Flex>
      </fieldset>
    </Form>
  )
}
