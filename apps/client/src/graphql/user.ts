import { useMutation, useQuery } from "@tanstack/react-query"
import { graphql } from '../libs/graphql'
import { client } from "../libs/client"
import { TSignupFormData } from "../types"

const useGetUserQuery = (id: number) => {
  const UserQuery = graphql(`query GetUser($where: UserWhereUniqueInput!) {user(where: $where) {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)
  return useQuery({
    queryKey: ['user', id, UserQuery],
    queryFn: async () => await client(UserQuery, { where: { id } }),
  })
}

const useCreateUserMutation = (data: TSignupFormData) => {
  const UserMutation = graphql(`mutation CreateUser($data: UserCreateInput2!) {
    createUser(data: $data){
      id
      email
      name
      createdAt
    }
  }`)
  return useMutation({
    mutationFn: async () => await client(UserMutation, { data }),
  })
}

export { useGetUserQuery, useCreateUserMutation }
