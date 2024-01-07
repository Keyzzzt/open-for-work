import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { EmptyState } from '@/components/EmptyState'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { FAQCategoryRow } from '@/app/(admin)/dashboard/(routes)/entities/faq-categories/(c)/FAQCategoryRow'
import { Heading2 } from '@/components/text/Heading2'

export type FAQListCategory = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

type Props = {
  categories: FAQListCategory[]
}
export const FAQCategoriesList: FC<Props> = ({ categories }) => {
  return (
    <>
      {categories.length === 0 ? (
        <EmptyState
          title='Categories not found'
          subTitle='New'
          href='/dashboard/entities/faq-categories/create'
        />
      ) : (
        <>
          <div className='flex items-center justify-end mt-10'>
            <CustomLink
              title='FAQ'
              href='/dashboard/entities/faq'
              className='mr-4'
            />
            <CustomLink
              title='New'
              href='/dashboard/entities/faq-categories/create'
            />
          </div>
          <div className='overflow-x-auto inline-block min-w-full align-middle'>
            <Heading2 value="FAQ's categories list" className='mb-4' />
            <Table>
              <thead>
                <tr>
                  <TableTH value='Name' />
                  <TableTH value='Date added' />
                  <TableTH value='Last updated' />
                </tr>
              </thead>
              <tbody className='divide-y divide-borderColor'>
                {categories.map((c) => (
                  <FAQCategoryRow category={c} key={c.id} />
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  )
}
