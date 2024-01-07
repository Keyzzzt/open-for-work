import { FC, ReactNode } from 'react'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { CreateUpdateProductCategory } from '@/app/(admin)/dashboard/(routes)/entities/categories/(c)/CreateUpdateProductCategory'

type Props = {
  params: {
    id: string
  }
}

const ProductCategories: FC<Props> = async ({ params }) => {
  const id = params.id

  let toRender: ReactNode

  try {
    if (id === 'create') {
      toRender = <CreateUpdateProductCategory action='create' />
    } else {
      const category = await prismaClient.category.findUnique({
        where: {
          id,
        },
      })
      if (!category) {
        toRender = (
          <EmptyState
            title='Category not found'
            subTitle='Go to categpories list'
            href='/dashboard/entities/categories'
          />
        )
      } else {
        toRender = (
          <CreateUpdateProductCategory
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

export default ProductCategories
