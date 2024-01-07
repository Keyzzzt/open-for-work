import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const Section: FC<DefaultProps> = ({ children, className }) => {
  return (
    <section className={cn('py-12 sm:py-16', className)}>{children}</section>
  )
}

export default Section
