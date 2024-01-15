import { useQuery } from "@tanstack/react-query"
import { graphql } from '@wallet/shared-gql'
import { client } from "../libs/client"

function useGetUsersQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => await client(graphql('query GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    id\n    name\n    email\n  }\n}'), { where: { id: 1 } }),
  })
}

export { useGetUsersQuery }
