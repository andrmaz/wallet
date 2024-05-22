import { SignupFormData } from '../components/signup'
import { z } from 'zod'

export type TSignupFormData = z.infer<ReturnType<typeof SignupFormData>>
