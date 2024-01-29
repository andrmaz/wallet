import * as React from 'react'
import {Box, Flex, Navbar} from '@wallet/shared-ui'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

export const Header = () => {
  const {t} = useTranslation()
  const items = React.useMemo(
    () => [
      {name: t('header.navigation.product'), expand: true},
      {name: t('header.navigation.feature'), expand: true},
      {name: t('header.navigation.customer'), expand: false},
      {name: t('header.navigation.blog'), expand: false},
      {name: t('header.navigation.pricing'), expand: true},
    ],
    [t]
  )
  return (
    <Flex
      width='100%'
      direction='row'
      align='center'
      justify='between'
      wrap='nowrap'
      px='9'
    >
      <Box>{t('title')}</Box>
      <Navbar items={items} />
      <Box width='9'>
        <Link to=''>{t('header.action.login')}</Link>
      </Box>
    </Flex>
  )
}
