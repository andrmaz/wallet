import {useLocale} from '@wallet/common'
import {Box, Flex, Text} from '@wallet/ui'
import {Link} from 'react-router-dom'
import {Path} from '../../data/routes'
import {Toolbar} from '../toolbar'
import {useUserQuery} from '../../graphql/user'

export const Header = () => {
  const {t} = useLocale()
  const user = useUserQuery({id: 1}) // Replace with actual user ID or logic to get the current user ID
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
        {user ? (
          <Text>{user.data?.user?.name}</Text>
        ) : (
          <Link to={Path.Registration}>{t('header.action.register')}</Link>
        )}
      </Box>
    </Flex>
  )
}
