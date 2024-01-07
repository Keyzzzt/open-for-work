import { prismaClient } from '@/prisma/prismaClient'

type Params = {
  sort?: string
  page?: number
  limit?: number
  search?: string
  currentCategory: string
}
/**
 * @param sort - string, sort value
 * @param page - number, page number
 * @param limit - number, items per page
 * @param search - string, search value
 * @param currentCategory - string, selected category
 * @returns array of products according to params
 */
export const getProductsByQuery = async ({
  sort,
  page = 1,
  limit = 10,
  search,
  currentCategory,
}: Params) => {
  const skip = (page - 1) * limit
  let sortBy: any

  // If search OR sort applied
  try {
    if (sort || search) {
      // If sort applied = create sort object for request
      if (sort) {
        switch (sort) {
          case 'a-z': {
            sortBy = { title: 'asc' }
            break
          }
          case 'z-a': {
            sortBy = { title: 'desc' }
            break
          }
          case 'price-asc': {
            sortBy = { price: 'asc' }
            break
          }
          case 'price-desc': {
            sortBy = { price: 'desc' }
            break
          }
          default:
            sortBy = { title: 'asc' }
            break
        }
      }

      // If both sort and search are applied
      if (search && sort) {
        if (currentCategory === 'All') {
          const count = await prismaClient.product.findMany({
            where: {
              AND: [
                { title: { contains: search, mode: 'insensitive' } },
                { isArchived: false },
              ],
            },
          })
          const products = await prismaClient.product.findMany({
            where: {
              AND: [
                { title: { contains: search, mode: 'insensitive' } },
                { isArchived: false },
              ],
            },
            include: {
              category: true,
              images: true,
            },
            orderBy: sortBy,
            take: limit,
            skip,
          })
          return {
            success: true,
            products,
            totalCount: count.length,
          }
        } else {
          const count = await prismaClient.product.findMany({
            where: {
              AND: [
                { title: { contains: search, mode: 'insensitive' } },
                { category: { title: currentCategory } },
                { isArchived: false },
              ],
            },
          })
          const products = await prismaClient.product.findMany({
            where: {
              AND: [
                { title: { contains: search, mode: 'insensitive' } },
                { category: { title: currentCategory } },
                { isArchived: false },
              ],
            },
            include: {
              category: true,
              images: true,
            },
            orderBy: sortBy,
            take: limit,
            skip,
          })
          return {
            success: true,
            products,
            totalCount: count.length,
          }
        }
      }
      // If only search OR sort applied
      else {
        if (search) {
          if (currentCategory === 'All') {
            const count = await prismaClient.product.findMany({
              where: {
                AND: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { isArchived: false },
                ],
              },
            })
            const products = await prismaClient.product.findMany({
              where: {
                AND: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { isArchived: false },
                ],
              },
              include: {
                category: true,
                images: true,
              },
              take: limit,
              skip,
            })
            return {
              success: true,
              products,
              totalCount: count.length,
            }
          } else {
            const count = await prismaClient.product.findMany({
              where: {
                AND: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { category: { title: currentCategory } },
                  { isArchived: false },
                ],
              },
            })
            const products = await prismaClient.product.findMany({
              where: {
                AND: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { category: { title: currentCategory } },
                  { isArchived: false },
                ],
              },
              include: {
                category: true,
                images: true,
              },
              take: limit,
              skip,
            })
            return {
              success: true,
              products,
              totalCount: count.length,
            }
          }
        } else {
          if (currentCategory === 'All') {
            const count = await prismaClient.product.findMany({
              where: { isArchived: false },
            })
            const products = await prismaClient.product.findMany({
              where: { isArchived: false },
              include: {
                category: true,
                images: true,
              },
              orderBy: sortBy,
              take: limit,
              skip,
            })
            return {
              success: true,
              products,
              totalCount: count.length,
            }
          } else {
            const count = await prismaClient.product.findMany({
              where: {
                AND: [
                  { category: { title: currentCategory } },
                  { isArchived: false },
                ],
              },
            })
            const products = await prismaClient.product.findMany({
              where: {
                AND: [
                  { category: { title: currentCategory } },
                  { isArchived: false },
                ],
              },
              include: {
                category: true,
                images: true,
              },
              orderBy: sortBy,
              take: limit,
              skip,
            })
            return {
              success: true,
              products,
              totalCount: count.length,
            }
          }
        }
      }
    }
    // Else return all products for the current category
    else {
      if (currentCategory === 'All') {
        const count = await prismaClient.product.findMany({
          where: {
            isArchived: false,
          },
        })
        const products = await prismaClient.product.findMany({
          where: {
            isArchived: false,
          },
          include: {
            category: true,
            images: true,
          },
          take: limit,
          skip,
        })
        return {
          success: true,
          products,
          totalCount: count.length,
        }
      } else {
        const count = await prismaClient.product.findMany({
          where: {
            AND: [
              { category: { title: currentCategory } },
              { isArchived: false },
            ],
          },
        })

        const products = await prismaClient.product.findMany({
          where: {
            AND: [
              { category: { title: currentCategory } },
              { isArchived: false },
            ],
          },
          include: {
            category: true,
            images: true,
          },
          take: limit,
          skip,
        })
        return {
          success: true,
          products,
          totalCount: count.length,
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch product by query', err)
    return {
      success: false,
      products: null,
      totalCount: null,
    }
  }
}
