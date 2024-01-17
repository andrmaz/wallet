import { useQuery } from "@tanstack/react-query"
import { graphql } from '@wallet/shared-gql'
import { client } from "../libs/client"

const useGetUserQuery = (id: number) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: async () => await client(graphql('query GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    id\n    name\n    email\n    accounts {\n      id\n      name\n    }\n  }\n}'), { where: { id } }),
  })

export { useGetUserQuery }
