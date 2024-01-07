import { prismaClient } from '@/prisma/prismaClient'
import { format } from 'date-fns'
import { sleep } from '@/helpers/sleep'
import { FaqCategory } from '.prisma/client'

export type FAQListType = {
  id: string
  answer: string
  question: string
  createdAt: string
  updatedAt: string
  category: FaqCategory
}
export const getAllFAQsForAdminList = async () => {
  try {
    const faqs = await prismaClient.faqItem.findMany({
      include: { category: true },
    })

    const formatted: FAQListType[] = faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      createdAt: format(f.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(f.updatedAt, 'MMMM do, yyyy'),
      category: f.category,
    }))

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    return { data: [] }
  }
}
