import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

type Props = DefaultProps & {
  value: string | number
  fontSmall?: boolean
  fontLarge?: boolean
}

export const Paragraph: FC<Props> = ({
  value,
  className,
  fontSmall,
  fontLarge,
  children,
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={cn('text-lg text-textColor', className, {
        'text-xs': fontSmall,
        'text-xl': fontLarge,
      })}
    >
      {children} {value}
    </p>
  )
}
