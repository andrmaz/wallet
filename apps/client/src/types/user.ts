import { z } from 'zod'

export const SignupFormData = z
  .object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  })
  .required()
export type TSignupFormData = z.infer<typeof SignupFormData>
