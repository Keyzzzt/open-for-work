import { FC, ReactNode } from 'react'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { CreateUpdateFAQCategory } from '@/app/(admin)/dashboard/(routes)/entities/faq-categories/(c)/CreateUpdateFAQCategory'

type Props = {
  params: {
    id: string
  }
}

const FAQCategories: FC<Props> = async ({ params }) => {
  const id = params.id

  let toRender: ReactNode

  try {
    if (id === 'create') {
      toRender = <CreateUpdateFAQCategory action='create' />
    } else {
      const category = await prismaClient.faqCategory.findUnique({
        where: {
          id,
        },
      })
      if (!category) {
        toRender = (
          <EmptyState
            title='Category not found'
            subTitle='Go to categpories list'
            href='/dashboard/entities/faq-categories/create'
          />
        )
      } else {
        toRender = (
          <CreateUpdateFAQCategory
            action='update'
            category={category}
            categoryId={id}
          />
        )
      }
    }
  } catch (e) {
    toRender = <EmptyState title='Something went wrong.' />
  }

  return toRender
}

export default FAQCategories
