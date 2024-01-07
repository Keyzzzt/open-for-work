import { FC } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  value: string
  className?: string
}
export const TableTH: FC<Props> = ({ value, className }) => {
  return (
    <th
      scope='col'
      className={cn(
        'whitespace-nowrap py-3.5 text-left font-semibold',
        className,
      )}
    >
      {value}
    </th>
  )
}
