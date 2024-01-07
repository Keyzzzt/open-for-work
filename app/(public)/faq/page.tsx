import { FaqClient } from '@/app/(public)/faq/(c)/FaqClient'
import { prismaClient } from '@/prisma/prismaClient'
import { getFaqs } from '@/helpers/getFaqs'
import { EmptyState } from '@/components/EmptyState'

const FaqPage = async ({
  searchParams,
}: {
  searchParams: { category: string }
}) => {
  const category = searchParams.category ? searchParams.category : ''

  try {
    const faqItems = await getFaqs(category)
    const faqPage = await prismaClient.faqPage.findFirst({})
    const faqCategories = await prismaClient.faqCategory.findMany({})

    if (faqPage && faqItems && faqCategories) {
      return (
        <FaqClient
          pageTitle={faqPage.title}
          pageDescription={faqPage.description}
          faqItems={faqItems}
          categories={faqCategories}
        />
      )
    } else {
      return <EmptyState title='Missing data' />
    }
  } catch (err) {
    console.error('Failed to fetch data for faq: ', err)
    return <EmptyState title='Something went wrong' />
  }
}

export default FaqPage
