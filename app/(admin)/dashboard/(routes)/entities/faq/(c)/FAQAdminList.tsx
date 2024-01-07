import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { EmptyState } from '@/components/EmptyState'
import { FAQListType } from '@/helpers/getAllFAQsForAdminList'
import { FAQRow } from '@/app/(admin)/dashboard/(routes)/entities/faq/(c)/FAQRow'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  faqs: FAQListType[]
}
export const FAQAdminList: FC<Props> = async ({ faqs }) => {
  if (faqs.length === 0) {
    return (
      <EmptyState
        href='/dashboard/entities/faq/create'
        title="FAQ's not found"
        subTitle='Create new FAQ'
      />
    )
  }

  return (
    <>
      <div className='flex justify-end mt-4'>
        <CustomLink
          title='Categories'
          href='/dashboard/entities/faq-categories'
        />
        <CustomLink title='New' href='/dashboard/entities/faq/create' />
      </div>
      <div className='overflow-x-auto inline-block min-w-full align-middle'>
        <Heading2 value="FAQ's list" className='mb-4' />
        <Table>
          <thead>
            <tr>
              <TableTH value='Question' />
              <TableTH value='Answer' />
              <TableTH value='Created' />
              <TableTH value='Updated' />
              <TableTH value='Category' />
            </tr>
          </thead>
          <tbody className='divide-y divide-borderColor'>
            {faqs.map((f) => (
              <FAQRow faq={f} key={f.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
