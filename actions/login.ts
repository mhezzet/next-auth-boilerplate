'use server'

import { signIn } from '@/auth'
import { db } from '@/lib/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { z } from 'zod'

type LoginAction = (
  data: z.infer<typeof LoginSchema>,
) => Promise<{ success?: string; error?: string }>

export const login: LoginAction = async (data) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  try {
    const {} = await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }

  return { success: 'ok' }
}
