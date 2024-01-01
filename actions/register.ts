'use server'

import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

type LoginAction = (
  data: z.infer<typeof RegisterSchema>,
) => Promise<{ success?: string; error?: string }>

export const register: LoginAction = async (data) => {
  const validatedFields = RegisterSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already exists!' }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  //TODO: Send Verification Email

  return { success: 'ok' }
}
