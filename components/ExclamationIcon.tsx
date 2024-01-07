import { FC } from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'
import { cn } from '@/lib/utils'

type Props = {
  type: 'success' | 'danger' | 'warning'
  className?: string
}
export const ExclamationIcon: FC<Props> = ({ type, className }) => {
  return (
    <div
      className={cn(
        'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full',
        className,
        {
          'bg-success': type === 'success',
          'bg-danger': type === 'danger',
          'bg-warning': type === 'warning',
        },
      )}
    >
      <BsExclamationTriangle
        size={26}
        className='mb-1 text-white'
        aria-hidden='true'
      />
    </div>
  )
}
