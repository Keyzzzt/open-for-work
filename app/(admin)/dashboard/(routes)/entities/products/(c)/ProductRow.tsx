'use client'
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TableTD } from '@/components/TableTD'
import { TableRow } from '@/components/TableRow'
import { AdminProductsList } from '@/helpers/getAllProductsForAdminList'

type Props = {
  product: AdminProductsList
}
export const ProductRow: FC<Props> = ({ product }) => {
  const router = useRouter()
  let cells: ReactNode[] = []
  const url = `/dashboard/entities/products/${product.id}`

  for (let key in product) {
    if (key !== 'id') {
      if (product[key as keyof AdminProductsList] === false) {
        cells.push(<TableTD key={key} value='No' />)
      } else if (product[key as keyof AdminProductsList] === true) {
        cells.push(<TableTD key={key} value='Yes' />)
      } else {
        cells.push(
          <TableTD
            key={key}
            value={product[key as keyof AdminProductsList].toString()}
          />,
        )
      }
    }
  }

  return <TableRow onClick={() => router.push(url)}>{cells}</TableRow>
}
