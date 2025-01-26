import {Flex, Section, Separator} from '@wallet/shared-ui'
import {Signin} from '../components/signin'
import {Testimonial} from '../components/testimonial'

export default function Login() {
  return (
    <Flex height='100%' justify='center' align='center'>
      <Section grow='1'>
        <Signin />
      </Section>
      <Separator orientation='vertical' decorative />
      <Section p='9'>
        <Testimonial text='login.intro' />
      </Section>
    </Flex>
  )
}
