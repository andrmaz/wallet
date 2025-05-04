import { graphql, client } from '@wallet/common'
import { useMutation, useQuery } from "@tanstack/react-query"
import { /* TSigninFormData, */ TSignupFormData } from "../types"

/* const useLoginUserQuery = (data: TSigninFormData) => {
  const UserQuery = graphql(`query LoginUser($data: UserLoginInput2!) {loginUser(data: $data) {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)

  return useQuery({
    queryKey: ['user', UserQuery, data],
    queryFn: async () => await client(UserQuery, { data }),
  })
} */

const useRegisterUserMutation = (data: TSignupFormData) => {
  const UserMutation = graphql(`mutation RegisterUserSession($data: UserRegisterInput2 !) {registerUserSession(data: $data) {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)
  return useMutation({
    mutationFn: async () => await client(UserMutation, [{ data }]),
  })
}

const useUserQuery = (variables: { id: number }) => {
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
    queryKey: ['user', UserQuery, { where: { id: variables.id } }],
    queryFn: async () => await client(UserQuery, [{ where: { id: variables.id } }]),
  })
}

export { useRegisterUserMutation, useUserQuery }
