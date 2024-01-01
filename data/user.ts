import { db } from '@/lib/db'

export const getUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: { email },
  })
}
