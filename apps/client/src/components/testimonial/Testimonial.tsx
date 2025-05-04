import {useLocale} from '@wallet/common'
import {Text} from '@wallet/ui'

export const Testimonial = () => {
  const {t} = useLocale()
  return (
    <div>
      <Text>{t('registration.intro')}</Text>
    </div>
  )
}
