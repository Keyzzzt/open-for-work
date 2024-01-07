import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type Props = DefaultProps & {
  value: string | number
}

export const Heading1: FC<Props> = ({ id, value, className, children }) => {
  return (
    <h1
      id={id}
      className={cn(
        'text-textColor text-3xl font-bold sm:text-4xl md:text-5xl',
        className,
      )}
    >
      {children} {value}
    </h1>
  )
}
