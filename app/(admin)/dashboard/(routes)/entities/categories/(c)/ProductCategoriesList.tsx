import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { EmptyState } from '@/components/EmptyState'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { ProductCategoryRow } from '@/app/(admin)/dashboard/(routes)/entities/categories/(c)/ProductCategoryRow'
import { Category } from '@/helpers/formatProductCategories'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  categories: Category[]
}
export const ProductCategoriesList: FC<Props> = ({ categories }) => {
  return (
    <>
      {categories.length === 0 ? (
        <EmptyState
          title='Categories not found'
          subTitle='Create new category'
          href='/dashboard/entities/categories/create'
        />
      ) : (
        <>
          <div className='flex items-center justify-end mt-10'>
            <CustomLink
              title='Products'
              href='/dashboard/entities/products'
              className='mr-2'
            />
            <CustomLink
              title='New'
              href='/dashboard/entities/categories/create'
            />
          </div>
          <div className='overflow-x-auto inline-block min-w-full align-middle'>
            <Heading2 value='Products categories list' className='mb-4' />
            <Table>
              <thead>
                <tr>
                  <TableTH value='Name' />
                  <TableTH value='Description' />
                  <TableTH value='Date added' />
                  <TableTH value='Last updated' />
                </tr>
              </thead>
              <tbody className='divide-y divide-borderColor'>
                {categories.map((c) => (
                  <ProductCategoryRow category={c} key={c.id} />
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  )
}
