import { useMutation, useQuery } from "@tanstack/react-query"
import { graphql } from '../libs/graphql'
import { client } from "../libs/client"
import { TSigninFormData, TSignupFormData } from "../types"

const useRegisterUserMutation = (data: TSignupFormData) => {
  const RegisterMutation = graphql(`mutation RegisterUserSession($data: UserRegisterInput2 !) {registerUserSession(data: $data) {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)
  return useMutation({
    mutationFn: async () => await client(RegisterMutation, { data }),
  })
}

const useUserSessionQuery = () => {
  const SessionQuery = graphql(`query RetrieveUserSession {retrieveUserSession {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)
  return useQuery({
    queryKey: ['user', SessionQuery],
    queryFn: async () => await client(SessionQuery),
  })
}

const useLogoutUserMutation = () => {
  const LogoutMutation = graphql(`mutation LogoutUserSession {logoutUserSession}`)
  return useMutation({
    mutationFn: async () => await client(LogoutMutation),
  })
}

const useLoginUserMutation = (data: TSigninFormData) => {
  const LoginMutation = graphql(`mutation LoginUser($data: UserLoginInput2!) {loginUserSession(data: $data) {
    id
    email
    name
    accounts {
      id
      name
    }
  }}`)
  return useMutation({
    mutationFn: async () => await client(LoginMutation, { data }),
  })
}


export { useRegisterUserMutation, useUserSessionQuery, useLogoutUserMutation, useLoginUserMutation }
