import {Field, Form, Submit} from '@wallet/shared-ui'
import {useTranslation} from 'react-i18next'

const Signup = () => {
  const {t} = useTranslation()
  return (
    <Form>
      <fieldset>
        <legend>{t('registration.title')}</legend>
        <p>{t('registration.intro')}</p>
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
        <Submit>{t('registration.form.action.submit')}</Submit>
      </fieldset>
    </Form>
  )
}

export {Signup}
