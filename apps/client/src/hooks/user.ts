import { useMutation, useQuery } from "@tanstack/react-query"
import { graphql } from '@wallet/shared-gql'
import { client } from "../libs/client"
import { SignupFormData } from "../components/signup"

const useGetUserQuery = (id: number) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: async () => await client(graphql('query GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    id\n    name\n    email\n    accounts {\n      id\n      name\n    }\n  }\n}'), { where: { id } }),
  })

const useCreateUserMutation = (data: SignupFormData) =>
  useMutation({
    mutationFn: async () => await client(graphql('mutation CreateUser($data: UserCreateInput2!) {\n  createUser(data: $data) {\n    id\n    email\n    name\n    accounts {\n      id\n      name\n    }\n    createdAt\n    updatedAt\n  }\n}'), { data: { ...data, password: { create: { hash: data.password } } } }),
  })

export { useGetUserQuery, useCreateUserMutation }
