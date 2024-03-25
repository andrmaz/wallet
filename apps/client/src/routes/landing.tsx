import {Flex, Section} from '@wallet/shared-ui'
import {Hero} from '../components/hero'

export default function Landing() {
  return (
    <Flex height='100%' align='center'>
      <Hero />
      <Section grow='1' />
    </Flex>
  )
}
