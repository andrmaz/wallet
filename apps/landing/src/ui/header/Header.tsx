import {Box, Flex, Navbar} from '@wallet/shared-ui'
import {Link} from 'react-router-dom'

export const Header = () => {
  return (
    <Flex
      width='100%'
      direction='row'
      align='center'
      justify='between'
      wrap='nowrap'
      px='9'
    >
      <Box>Wallet</Box>
      <Navbar />
      <Box width='9'>
        <Link to=''>Log in </Link>
      </Box>
    </Flex>
  )
}
