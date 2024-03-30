import {Button, Field, Flex, Form} from '@wallet/shared-ui'
import {useTranslation} from 'react-i18next'

export const Signup = () => {
  const {t} = useTranslation()
  return (
    <Form>
      <fieldset>
        <legend>{t('registration.title')}</legend>
        <Field
          name='email'
          label={t('registration.form.email.label')}
          message={t('registration.form.email.message')}
          match='valueMissing'
          control={<input className='input' type='email' required />}
        />
        <Field
          name='password'
          label={t('registration.form.password.label')}
          message={t('registration.form.password.message')}
          match='valueMissing'
          control={<input className='input' type='password' required />}
        />
        <Flex justify='end'>
          <Button variant='soft'>{t('registration.form.action.submit')}</Button>
        </Flex>
      </fieldset>
    </Form>
  )
}
