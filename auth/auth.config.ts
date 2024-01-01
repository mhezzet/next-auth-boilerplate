import { db } from '@/lib/db'
import { LoginSchema } from '@/schemas'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        const user = await db.user.findUnique({ where: { email } })

        if (!user || !user.password) return null

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return null

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
