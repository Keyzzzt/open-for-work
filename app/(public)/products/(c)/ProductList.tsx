import { FC } from 'react'
import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/app/(public)/products/(c)/ProductCard'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'

type Props = {
  sort?: string
  search?: string
  category?: string
  totalPages: number
  currentPage: number
  products: ProductType[]
}
export const ProductList: FC<Props> = ({
  sort,
  search,
  products,
  category,
  totalPages,
  currentPage,
}) => {
  return (
    <div className='mt-4 sm:mt-6'>
      <h2 className='sr-only'>Products</h2>
      <div className='grid grid-cols-2 border-l border-borderColor md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        sort={sort}
        search={search}
        category={category}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}
