'use client'
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

type Props = DefaultProps & {
  title: string
  fill?: 'success' | 'danger' | 'blank' | 'primary'
}

export const CustomLink: FC<Props> = ({
  title,
  href,
  className,
  onClick,
  fill,
}) => {
  return (
    <Link
      onClick={onClick}
      href={href ? href : ''}
      className={cn(
        'py-2 px-3 text-sm text-textColor font-bold rounded-md transition-colors uppercase hover:text-textHover',
        className,
        {
          'disabled:bg-gray disabled:border-gray disabled:text-white hover:text-white hover:bg-successHover active:bg-successActive':
            fill === 'success',
          'disabled:bg-gray disabled:border-gray disabled:text-white hover:text-white hover:bg-dangerHover active:bg-dangerActive':
            fill === 'danger',
          'disabled:bg-gray disabled:border-gray disabled:text-white text-white bg-accent hover:bg-accentHover active:bg-accentActive':
            fill === 'primary',
          'disabled:text-textColor hover:text-textHover': fill === 'blank',
        },
      )}
    >
      {title}
    </Link>
  )
}
