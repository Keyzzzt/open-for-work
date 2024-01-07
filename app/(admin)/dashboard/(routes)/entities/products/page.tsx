import { Suspense } from 'react'
import Await from '@/components/Await'
import { getAllProductsForAdminList } from '@/helpers/getAllProductsForAdminList'
import { ProductsAdminList } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/ProductsAdminList'
import { ListSkeleton } from '@/components/ListSkeleton'

const ProductListAdmin = async () => {
  const promise = getAllProductsForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <ProductsAdminList products={data} />}
      </Await>
    </Suspense>
  )
}

export default ProductListAdmin
