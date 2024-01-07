import { FC, ReactNode } from 'react'
import { getSingleProduct } from '@/helpers/getSingleProduct'
import { EmptyState } from '@/components/EmptyState'
import { formattSingleProduct } from '@/helpers/formattSingleProduct'
import { prismaClient } from '@/prisma/prismaClient'
import {
  Category,
  formatProductCategories,
} from '@/helpers/formatProductCategories'
import { EditProductForm } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'
import { NewProductForm } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'

type Props = {
  params: {
    productId: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let toRender: ReactNode
  if (params.productId !== 'create') {
    const data = await getSingleProduct(params.productId)
    if (!data) {
      toRender = (
        <EmptyState
          title='Product not found'
          subTitle='Go to products list'
          href='/dashboard/entities/products'
        />
      )
    }
    const formattedProduct = formattSingleProduct(data)
    const categories = await prismaClient.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    const filteredCategories = categories.filter((c) => c.title !== 'All')
    const formattedCategories = formatProductCategories(filteredCategories)
    toRender = (
      <EditProductForm
        product={formattedProduct}
        categories={formattedCategories}
      />
    )
  } else {
    try {
      const categories = await prismaClient.category.findMany({
        where: {
          NOT: { title: 'All' },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const formatted: Category[] = formatProductCategories(categories)
      toRender = <NewProductForm categories={formatted} />
    } catch (err) {
      toRender = <EmptyState title='Something went wrong!' />
    }
  }

  return toRender
}

export default Page
