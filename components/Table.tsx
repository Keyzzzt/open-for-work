import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Table: FC<Props> = ({ children }) => {
  return (
    <table className='min-w-full divide-y divide-borderColor'>{children}</table>
  )
}
