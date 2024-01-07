import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  title: string
  href: string
  icon: ReactNode
  onClick: () => void
}

export const HeaderCallToAction: FC<Props> = ({
  icon,
  title,
  href,
  onClick,
}) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className='flex items-center justify-center gap-x-2.5 p-3 hover:bg-lightGray hover:text-textHover'
    >
      <span className='h-5 w-5 flex-none' aria-hidden='true'>
        {icon}
      </span>
      <Paragraph value={title} />
    </Link>
  )
}
