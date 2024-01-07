import { prismaClient } from '@/prisma/prismaClient'

/**
 * @returns products count that are not archived e.g. visible to customers, or an empty array
 */
export const getAllNotArchivedProductsCount = async () => {
  const products = await prismaClient.product.findMany({
    where: {
      isArchived: false,
    },
  })
  return products.length
}
