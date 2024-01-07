import { prismaClient } from '@/prisma/prismaClient'
import { format } from 'date-fns'
import { sleep } from '@/helpers/sleep'
import { FAQListCategory } from '@/app/(admin)/dashboard/(routes)/entities/faq-categories/(c)/FAQCategoriesList'

export const getAllFAQCategoriesForAdminList = async () => {
  try {
    const categories = await prismaClient.faqCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 'All' category => first element
    categories.sort((a, b) =>
      a.title === 'All' ? -1 : b.title === 'All' ? 1 : 0,
    )

    const formatted: FAQListCategory[] = categories.map((f) => ({
      id: f.id,
      title: f.title,
      createdAt: format(f.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(f.updatedAt, 'MMMM do, yyyy'),
    }))

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    return { data: [] }
  }
}
