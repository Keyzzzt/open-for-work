import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type Props = DefaultProps & {
  value: string
  fontSmall?: boolean
  fontLarge?: boolean
}

export const Heading2: FC<Props> = ({
  id,
  value,
  className,
  fontSmall,
  fontLarge,
  onClick,
}) => {
  return (
    <h2
      onClick={onClick}
      id={id}
      className={cn('text-textColor text-2xl font-bold', className, {
        'text-xl': fontSmall,
        'text-3xl sm:text-4xl lg:text-5xl': fontLarge,
      })}
    >
      {value}
    </h2>
  )
}
