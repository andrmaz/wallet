import { useQuery } from "@tanstack/react-query"
import { graphql } from '@wallet/shared-gql'
import { client } from "../libs/client"

function useGetUsersQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => await client(graphql(
      'query GetUsers {\n  allUsers {\n    id\n    name\n    email\n  }\n}'
    )),
  })
}

export { useGetUsersQuery }
