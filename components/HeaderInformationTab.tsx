import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  title: string
  icon: ReactNode
  href: string
  description: string
  onClick: () => void
}
export const HeaderInformationTab: FC<Props> = ({
  icon,
  title,
  href,
  description,
  onClick,
}) => {
  return (
    <div
      key={title}
      onClick={onClick}
      className='group relative rounded-lg p-6 hover:bg-lightGray cursor-pointer'
    >
      <div className='flex h-11 w-11 items-center justify-center rounded-lg'>
        {icon}
      </div>
      <Link href={href} className='mt-6 block'>
        <Heading3 value={title} />
      </Link>
      <Paragraph value={description} className='mt-1' />
    </div>
  )
}
