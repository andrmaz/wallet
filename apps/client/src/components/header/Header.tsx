import {Box, Flex, Dropdown, Button} from '@wallet/shared-ui'
import {useLocale} from '../../hooks/locale'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Path} from '../../data/routes'
import {Toolbar} from '../toolbar'
import {useLogoutUserMutation, useUserSessionQuery} from '../../graphql/user'

export const Header = () => {
  const {t} = useLocale()
  const location = useLocation()
  const navigate = useNavigate()
  const {data, refetch} = useUserSessionQuery()
  const {mutateAsync} = useLogoutUserMutation()
  const user = data?.retrieveUserSession

  const logout: React.MouseEventHandler<HTMLButtonElement> = () => {
    mutateAsync().then(() => {
      refetch()
      navigate(Path.Landing)
    })
  }

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
          <Dropdown label={user.name}>
            <Button onClick={logout}>{t('header.action.logout')}</Button>
          </Dropdown>
        ) : location.pathname === Path.Login ? (
          <Link to={Path.Registration}>{t('header.action.register')}</Link>
        ) : (
          <Link to={Path.Login}>{t('header.action.login')}</Link>
        )}
      </Box>
    </Flex>
  )
}
