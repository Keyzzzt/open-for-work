import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

type Props = DefaultProps & {
  message: string
}

export const FormFieldErrorMessage: FC<Props> = ({ message, className }) => {
  return <p className={cn('text-danger', className)}>{message}</p>
}
