import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  onClick?: () => void
  href: string
  title: string
  className: string
}

export const HeaderMenuItem: FC<Props> = ({
  onClick,
  href,
  title,
  className,
}) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn('font-semibold', className)}
    >
      {title}
    </Link>
  )
}
