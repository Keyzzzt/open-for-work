import { FC } from 'react'

type Props = {
  value: string | any[]
}
export const TableTD: FC<Props> = ({ value }) => {
  return (
    <td className='whitespace-nowrap py-2 truncate max-w-[50px]'>{value}</td>
  )
}
