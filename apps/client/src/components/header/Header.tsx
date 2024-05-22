import {Box, Flex} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'
import {Link} from 'react-router-dom'
import {Path} from '../../data/routes'
import {Toolbar} from '../toolbar'

export const Header = () => {
  const {t} = useLocale()
  return (
    <Flex
      position='fixed'
      width='100%'
      direction='row'
      align='center'
      justify='between'
      wrap='nowrap'
      px='9'
    >
      <Box>{t('app.title')}</Box>
      <Toolbar />
      <Box width='9'>
        <Link to={Path.Registration}>{t('header.action.register')}</Link>
      </Box>
    </Flex>
  )
}
