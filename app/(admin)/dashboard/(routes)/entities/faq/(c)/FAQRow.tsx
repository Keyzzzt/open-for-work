'use client'
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TableTD } from '@/components/TableTD'
import { TableRow } from '@/components/TableRow'
import { FAQListType } from '@/helpers/getAllFAQsForAdminList'

type Props = {
  faq: FAQListType
}
export const FAQRow: FC<Props> = ({ faq }) => {
  const router = useRouter()
  let cells: ReactNode[] = []
  const url = `/dashboard/entities/faq/${faq.id}`

  for (let key in faq) {
    if (key !== 'id') {
      if (key === 'category') {
        cells.push(<TableTD key={key} value={faq.category.title} />)
      } else {
        cells.push(
          <TableTD
            key={key}
            value={faq[key as keyof FAQListType].toString()}
          />,
        )
      }
    }
  }

  return <TableRow onClick={() => router.push(url)}>{cells}</TableRow>
}
