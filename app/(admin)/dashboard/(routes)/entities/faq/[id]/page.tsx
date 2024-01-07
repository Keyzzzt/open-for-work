import { FC } from 'react'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { NewFAQForm } from '@/app/(admin)/dashboard/(routes)/entities/faq/(c)/NewFAQForm'
import { EditFAQForm } from '@/app/(admin)/dashboard/(routes)/entities/faq/(c)/EditFAQForm'

type Props = {
  params: {
    id: string
  }
}

const FAQPage: FC<Props> = async ({ params }) => {
  const id = params.id
  try {
    const faqPage = await prismaClient.faqPage.findFirst({})
    if (!faqPage) {
      return <EmptyState title='FAQ page not found.' />
    }
    const categories = await prismaClient.faqCategory.findMany({})
    if (!categories) {
      return <EmptyState title='FAQ categories not found.' />
    }
    if (id === 'create') {
      return <NewFAQForm categories={categories} faqPageId={faqPage.id} />
    } else {
      const faq = await prismaClient.faqItem.findUnique({
        where: {
          id,
        },
        include: { category: true },
      })
      if (!faq) {
        return <EmptyState title='FAQ not found.' />
      } else {
        return <EditFAQForm faq={faq} categories={categories} />
      }
    }
  } catch (err) {
    return <EmptyState title='Something went wrong!' />
  }
}

export default FAQPage
