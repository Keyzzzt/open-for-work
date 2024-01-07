import { prismaClient } from '@/prisma/prismaClient'

/**
 * @param id - string, product ID
 * @returns product | null
 */
export const getSingleProduct = async (id: string) => {
  try {
    return await prismaClient.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
      },
    })
  } catch (err) {
    console.error('Failed to fetch product: ', err)
    return null
  }
}
