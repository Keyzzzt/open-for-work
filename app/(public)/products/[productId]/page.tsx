import { FC } from 'react'
import { SingleProduct } from '@/components/SingleProduct'
import { formattSingleProduct } from '@/helpers/formattSingleProduct'
import { getSingleProduct } from '@/helpers/getSingleProduct'
import { EmptyState } from '@/components/EmptyState'

type Props = {
  params: { productId: string }
}
const ProductPage: FC<Props> = async ({ params }) => {
  const product = await getSingleProduct(params.productId)
  if (product) {
    const formattedProduct = formattSingleProduct(product)
    return <SingleProduct product={formattedProduct} />
  } else {
    return <EmptyState title='Product not found' />
  }
}

export default ProductPage
