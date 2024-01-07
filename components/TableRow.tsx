import { FC, ReactNode } from 'react'

type Props = {
  onClick: () => void
  children: ReactNode
  className?: string
}
export const TableRow: FC<Props> = ({ children, onClick, className }) => {
  return (
    <tr
      onClick={onClick}
      className={
        className ? className : 'hover:bg-lightGray transition cursor-pointer'
      }
    >
      {children}
    </tr>
  )
}
