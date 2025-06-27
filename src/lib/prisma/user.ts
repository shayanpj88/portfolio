import { prisma } from '@/lib/prisma'

export const getUser = async () => {
  return await prisma.user.findFirst();
}
