import {TFunction} from 'i18next'
import {z} from 'zod'

export const SigninFormData = (t: TFunction) =>
  z
    .object({
      email: z.string().email({message: t('registration.form.email.error')}),
      password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: t('registration.form.password.error'),
      }),
    })
    .required()
