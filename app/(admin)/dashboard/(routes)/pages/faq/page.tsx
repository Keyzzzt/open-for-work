import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { FaqPageAdmin } from '@/app/(admin)/dashboard/(routes)/pages/faq/FaqPageAdmin'
import { getFaqs } from '@/helpers/getFaqs'
import { ReactNode } from 'react'

const FAQPageAdmin = async ({
  searchParams,
}: {
  searchParams: { category: string }
}) => {
  const category = searchParams.category ? searchParams.category : ''
  let toRender: ReactNode

  try {
    const faqPage = await prismaClient.faqPage.findFirst({})

    if (faqPage) {
      const faqItems = await getFaqs(category)
      const categories = await prismaClient.faqCategory.findMany({})
      toRender = (
        <FaqPageAdmin
          faqPage={faqPage}
          faqItems={faqItems}
          categories={categories}
        />
      )
    } else {
      toRender = <EmptyState title='FAQ page not found' />
    }
  } catch (err) {
    toRender = <EmptyState title='Something went wrong' />
  }
  return toRender
}

export default FAQPageAdmin
