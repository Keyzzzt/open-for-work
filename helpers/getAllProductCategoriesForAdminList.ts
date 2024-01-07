import { prismaClient } from '@/prisma/prismaClient'
import { sleep } from '@/helpers/sleep'
import { formatProductCategories } from '@/helpers/formatProductCategories'

export const getAllProductCategoriesForAdminList = async () => {
  try {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 'All' category => first element
    categories.sort((a, b) =>
      a.title === 'All' ? -1 : b.title === 'All' ? 1 : 0,
    )

    const formatted = formatProductCategories(categories)

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    return { data: [] }
  }
}
