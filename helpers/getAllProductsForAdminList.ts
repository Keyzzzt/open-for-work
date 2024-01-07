import { prismaClient } from '@/prisma/prismaClient'
import { format } from 'date-fns'
import { sleep } from '@/helpers/sleep'

export type AdminProductsList = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  price: number
  countInStock: number
  category: string
  isFeatured: boolean
  isArchived: boolean
}
export const getAllProductsForAdminList = async () => {
  try {
    const products = await prismaClient.product.findMany({
      include: {
        category: true,
      },
    })

    const formatted: AdminProductsList[] = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      createdAt: format(p.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(p.updatedAt, 'MMMM do, yyyy'),
      price: p.price,
      countInStock: p.countInStock,
      category: p.category.title,
      isFeatured: p.isFeatured,
      isArchived: p.isArchived,
    }))

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    console.error('Failed to fetch products: ', err)
    return { data: [] }
  }
}
