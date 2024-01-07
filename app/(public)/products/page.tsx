import { ProductList } from '@/app/(public)/products/(c)/ProductList'
import { SortAndSearchPanel } from '@/components/client/SortAndSearchPanel'
import { formatProducts } from '@/helpers/formatProducts'
import { getProductsByQuery } from '@/helpers/getProductsByQuery'
import { PageNotFound } from '@/components/PageNotFound'
import { getAllNotArchivedProductsCount } from '@/helpers/getAllNotArchivedProductsCount'
import { EmptyState } from '@/components/EmptyState'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'
import { prismaClient } from '@/prisma/prismaClient'

const ClientProductsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const limit = searchParams.limit ? Number(searchParams.limit) : 8
  const search = searchParams.search
  const sort = searchParams.sort
  let currentCategory = searchParams.category

  try {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        title: 'asc',
      },
      include: {
        products: true,
      },
    })
    // Check if category exists. In case manually changed GET request parameters
    const ifCurrentCategoryExists = categories.find(
      (c) => c.title === currentCategory,
    )
    if (!ifCurrentCategoryExists) {
      return <PageNotFound />
    }

    const allProductsCount = await getAllNotArchivedProductsCount()

    const categoryTabs = categories.map((c) => {
      const notArchivedProducts = c.products.filter(
        (p) => p.isArchived === false,
      )

      if (c.title === 'All') {
        return {
          id: c.id,
          title: c.title,
          current: c.title === currentCategory,
          href: 'c.title',
          count: allProductsCount,
        }
      } else {
        return {
          id: c.id,
          title: c.title,
          current: c.title === currentCategory,
          href: 'c.title',
          count: notArchivedProducts.length,
        }
      }
    })

    const { products, totalCount } = await getProductsByQuery({
      page,
      limit,
      sort,
      search,
      currentCategory,
    })

    if (products && typeof totalCount === 'number') {
      const totalPages = Math.ceil(totalCount / limit)

      // Set 'All' category as first element
      categoryTabs.sort((a, b) =>
        a.title === 'All' ? -1 : b.title === 'All' ? 1 : 0,
      )

      const formattedProducts: ProductType[] = formatProducts(products)

      return (
        <>
          <SortAndSearchPanel
            categoryTabs={categoryTabs}
            search={search}
            currentCategory={currentCategory}
            sort={sort}
            currentPage={page}
          />
          {products.length > 0 ? (
            <div className='my-20'>
              {products.length === 0 ? (
                <div className='text-center'>
                  <EmptyState title='Products not found' />
                </div>
              ) : (
                <ProductList
                  sort={sort}
                  search={search}
                  currentPage={page}
                  category={currentCategory}
                  totalPages={totalPages}
                  products={formattedProducts}
                />
              )}
            </div>
          ) : (
            <EmptyState title='Products not found' />
          )}
        </>
      )
    } else {
      return <EmptyState title='Something went wrong' />
    }
  } catch (err) {
    console.error('Failed to fetch products: ', err)
    return <EmptyState title='Something went wrong' />
  }
}
export default ClientProductsListPage
