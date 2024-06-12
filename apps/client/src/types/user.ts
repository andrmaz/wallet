import { SigninFormData } from '../components/signin'
import { SignupFormData } from '../components/signup'
import { z } from 'zod'

export type TSignupFormData = z.infer<ReturnType<typeof SignupFormData>>
export type TSigninFormData = z.infer<ReturnType<typeof SigninFormData>>
