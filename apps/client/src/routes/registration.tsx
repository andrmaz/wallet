import {Flex, Section, Separator} from '@wallet/shared-ui'
import {Signup} from '../components/signup'
import {Testimonial} from '../components/testimonial'

export default function Registration() {
  return (
    <Flex height='100%' justify='center' align='center'>
      <Section grow='1'>
        <Signup />
      </Section>
      <Separator orientation='vertical' decorative />
      <Section p='9'>
        <Testimonial />
      </Section>
    </Flex>
  )
}
