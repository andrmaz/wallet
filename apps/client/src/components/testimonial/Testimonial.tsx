import {Text} from '@wallet/shared-ui'
import {useTranslation} from 'react-i18next'

export const Testimonial = () => {
  const {t} = useTranslation()
  return (
    <div>
      <Text>{t('registration.intro')}</Text>
    </div>
  )
}
