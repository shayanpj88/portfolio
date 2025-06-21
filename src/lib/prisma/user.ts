import { prisma } from '@/lib/prisma'

export const getUser = async () => {
  return await prisma.user.findUnique({
    where: { username : "shayanpj"},
  })
}
