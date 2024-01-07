import { ListSkeleton } from '@/components/ListSkeleton'
import { Suspense } from 'react'
import Await from '@/components/Await'
import { ProductCategoriesList } from '@/app/(admin)/dashboard/(routes)/entities/categories/(c)/ProductCategoriesList'
import { getAllProductCategoriesForAdminList } from '@/helpers/getAllProductCategoriesForAdminList'

const ProductCategoriesPage = async () => {
  const promise = getAllProductCategoriesForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <ProductCategoriesList categories={data} />}
      </Await>
    </Suspense>
  )
}

export default ProductCategoriesPage
