'use client'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
} from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = DefaultProps & {
  icon: ReactElement
}

export const IconButton: FC<Props> = ({ icon, className, onClick, type }) => {
  return (
    <button
      type={type}
      key={String(Math.random())}
      onClick={onClick}
      className={cn('text-textColor hover:text-textHover', className)}
    >
      {icon}
    </button>
  )
}
