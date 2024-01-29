import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@wallet/shared-ui'
import {useTranslation} from 'react-i18next'

export const Hero = () => {
  const {t} = useTranslation()
  return (
    <Flex height='100%' align='center'>
      <Section p='9'>
        <Container size='2'>
          <Heading as='h1' size='9' align='left' mb='9'>
            {t('hero.title')}
          </Heading>
          <Text as='p' size='5' align='left' highContrast>
            {t('hero.intro')}
          </Text>
        </Container>
        <Flex gap='9' align='center' mt='9'>
          <Button size='4' variant='solid' radius='full'>
            {t('hero.action.trial')}
          </Button>
          <Button size='4' variant='ghost'>
            {t('hero.action.demo')}
          </Button>
        </Flex>
      </Section>
      <Section grow='1'></Section>
    </Flex>
  )
}
