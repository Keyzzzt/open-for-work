import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { EmptyState } from '@/components/EmptyState'
import { AdminProductsList } from '@/helpers/getAllProductsForAdminList'
import { ProductRow } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/ProductRow'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  products: AdminProductsList[]
}
export const ProductsAdminList: FC<Props> = async ({ products }) => {
  if (products.length === 0) {
    return (
      <EmptyState
        href='/dashboard/entities/products/create'
        title='Products not found'
        subTitle='Create new product'
      />
    )
  }

  return (
    <>
      <div className='flex justify-end mt-4'>
        <CustomLink
          title='Categories'
          href='/dashboard/entities/categories'
          className='mr-2'
        />
        <CustomLink title='New' href='/dashboard/entities/products/create' />
      </div>
      <div className='overflow-x-auto inline-block min-w-full align-middle'>
        <Heading2 value='Products list' className='mb-4' />
        <Table>
          <thead>
            <tr>
              <TableTH value='Name' />
              <TableTH value='Date added' />
              <TableTH value='Last updated' />
              <TableTH value='Price' />
              <TableTH value='In stock' />
              <TableTH value='Category' />
              <TableTH value='Featured' />
              <TableTH value='Archived' />
            </tr>
          </thead>
          <tbody className='divide-y divide-borderColor'>
            {products.map((p) => (
              <ProductRow product={p} key={p.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
