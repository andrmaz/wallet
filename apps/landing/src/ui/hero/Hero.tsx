import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@wallet/shared-ui'

export const Hero = () => {
  return (
    <Flex height='100%' align='center'>
      <Section p='9'>
        <Container size='2'>
          <Heading as='h1' size='9' align='left' mb='9'>
            Take control of your money
          </Heading>
          <Text as='p' size='5' align='left' highContrast>
            Track your spending with an informative dashboard. Increase your
            income by making investments in just a few clicks.
          </Text>
        </Container>
        <Flex gap='9' align='center' mt='9'>
          <Button
            size='4'
            variant='solid'
            radius='full'
            style={{textTransform: 'uppercase'}}
          >
            Start free trial
          </Button>
          <Button size='4' variant='ghost' style={{textTransform: 'uppercase'}}>
            Request a demo
          </Button>
        </Flex>
      </Section>
      <Section grow='1'></Section>
    </Flex>
  )
}
