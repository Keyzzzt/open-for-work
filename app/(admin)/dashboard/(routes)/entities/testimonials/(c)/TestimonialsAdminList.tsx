import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { EmptyState } from '@/components/EmptyState'
import { TestimonialListType } from '@/helpers/getAllTestimonialsForAdminList'
import { TestimonialRow } from '@/app/(admin)/dashboard/(routes)/entities/testimonials/(c)/TestimonialRow'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  items: TestimonialListType[]
}
export const TestimonialsAdminList: FC<Props> = async ({ items }) => {
  if (items.length === 0) {
    return (
      <EmptyState
        href='/dashboard/entities/stories/create'
        title='Blog stories not found'
        subTitle='Create new story'
      />
    )
  }

  return (
    <>
      <div className='flex justify-end mt-4'>
        <CustomLink
          title='New'
          href='/dashboard/entities/testimonials/create'
        />
      </div>
      <div className='overflow-x-auto inline-block min-w-full align-middle'>
        <Heading2 value='Testimonials list' className='mb-6' />
        <Table>
          <thead>
            <tr>
              <TableTH value='Author' />
              <TableTH value='Content' />
              <TableTH value='Featured' />
              <TableTH value='Disabled' />
              <TableTH value='Created' />
              <TableTH value='Updated' />
            </tr>
          </thead>
          <tbody className='divide-y divide-borderColor'>
            {items.map((t) => (
              <TestimonialRow testimonial={t} key={t.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
