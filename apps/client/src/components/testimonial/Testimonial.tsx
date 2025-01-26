import {Text} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'

interface TestimonialProps {
  text: string
}

export const Testimonial = (props: TestimonialProps) => {
  const {t} = useLocale()
  return (
    <div>
      <Text>{t(props.text)}</Text>
    </div>
  )
}
