import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'

export const Hero = () => {
  const {t} = useLocale()
  return (
    <Section p='9'>
      <Container size='2'>
        <Heading as='h1' size='9' align='left' mb='9'>
          {t('landing.hero.title')}
        </Heading>
        <Text as='p' size='5' align='left' highContrast>
          {t('landing.hero.intro')}
        </Text>
      </Container>
      <Flex gap='9' align='center' mt='9'>
        <Button size='4' variant='solid' radius='full'>
          {t('landing.hero.action.trial')}
        </Button>
        <Button size='4' variant='ghost'>
          {t('landing.hero.action.demo')}
        </Button>
      </Flex>
    </Section>
  )
}
