import { useMutation/* , useQuery */ } from "@tanstack/react-query"
import { graphql } from '../libs/graphql'
import { client } from "../libs/client"
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
  const UserMutation = graphql(`mutation RegisterUser($data: UserRegisterInput2 !) {registerUser(data: $data) {
    id
    email
    name
   accounts {
      id
      name
   }
  }}`)
  return useMutation({
    mutationFn: async () => await client(UserMutation, { data }),
  })
}

export { /* useLoginUserQuery, */ useRegisterUserMutation }
