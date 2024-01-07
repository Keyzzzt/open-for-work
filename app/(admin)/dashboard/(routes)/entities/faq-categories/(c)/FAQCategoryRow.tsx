'use client'
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TableTD } from '@/components/TableTD'
import { TableRow } from '@/components/TableRow'
import { FAQListCategory } from '@/app/(admin)/dashboard/(routes)/entities/faq-categories/(c)/FAQCategoriesList'

type Props = {
  category: FAQListCategory
}
export const FAQCategoryRow: FC<Props> = ({ category }) => {
  const router = useRouter()

  // This approach is just for example
  let cells: ReactNode[] = []
  const url = `/dashboard/entities/faq-categories/${category.id}`
  for (let key in category) {
    if (key !== 'id') {
      cells.push(
        <TableTD key={key} value={category[key as keyof FAQListCategory]} />,
      )
    }
  }
  return (
    <>
      {category.title === 'All' ? (
        <TableRow className='bg-lightGray' onClick={() => {}}>
          {cells}
        </TableRow>
      ) : (
        <TableRow onClick={() => router.push(url)}>{cells}</TableRow>
      )}
    </>
  )
}
