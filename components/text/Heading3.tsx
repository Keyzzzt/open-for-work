import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type Props = DefaultProps & {
  value: string | number
  fontSmall?: boolean
  fontLarge?: boolean
}

export const Heading3: FC<Props> = ({
  id,
  value,
  className,
  children,
  fontLarge,
  fontSmall,
}) => {
  return (
    <h3
      id={id}
      className={cn('text-textColor text-2xl font-semibold', className, {
        'text-lg': fontSmall,
        'text-3xl sm:text-4xl lg:text-5xl': fontLarge,
      })}
    >
      {children} {value}
    </h3>
  )
}
