import { prismaClient } from '@/prisma/prismaClient'

/**
 * @param category the category title
 * @returns array of FAQ items || empty array
 */
export const getFaqs = async (category: string) => {
  let faqs
  if (category) {
    faqs = await prismaClient.faqItem.findMany({
      where: {
        category: { title: category },
      },
      include: {
        category: true,
      },
    })
  } else {
    faqs = await prismaClient.faqItem.findMany({
      include: {
        category: true,
      },
    })
  }
  return faqs
}
