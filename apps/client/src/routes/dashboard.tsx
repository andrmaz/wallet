import {Flex} from '@wallet/shared-ui'
import {useGetUserQuery} from '../graphql/user'

export default function Dashboard() {
  const {data} = useGetUserQuery(1)
  console.info(data?.getUser?.name)
  return <Flex height='100%' align='center'></Flex>
}
