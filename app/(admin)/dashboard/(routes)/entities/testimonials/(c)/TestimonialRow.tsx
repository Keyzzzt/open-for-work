'use client'
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TableTD } from '@/components/TableTD'
import { TableRow } from '@/components/TableRow'
import { TestimonialListType } from '@/helpers/getAllTestimonialsForAdminList'

type Props = {
  testimonial: TestimonialListType
}
export const TestimonialRow: FC<Props> = ({ testimonial }) => {
  const router = useRouter()
  let cells: ReactNode[] = []
  const url = `/dashboard/entities/testimonials/${testimonial.id}`

  for (let key in testimonial) {
    if (key !== 'id') {
      if (testimonial[key as keyof TestimonialListType] === false) {
        cells.push(<TableTD key={key} value='No' />)
      } else if (testimonial[key as keyof TestimonialListType] === true) {
        cells.push(<TableTD key={key} value='Yes' />)
      } else {
        cells.push(
          <TableTD
            key={key}
            value={testimonial[key as keyof TestimonialListType].toString()}
          />,
        )
      }
    }
  }

  return <TableRow onClick={() => router.push(url)}>{cells}</TableRow>
}
