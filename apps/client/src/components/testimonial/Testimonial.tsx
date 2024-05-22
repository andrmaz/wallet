import {Text} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'

export const Testimonial = () => {
  const {t} = useLocale()
  return (
    <div>
      <Text>{t('registration.intro')}</Text>
    </div>
  )
}
