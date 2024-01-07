import { FC } from 'react'
import Link from 'next/link'

type Props = {
  title: string
  href: string
  onClick: () => void
}

export const HeaderMobileMenuItem: FC<Props> = ({ onClick, href, title }) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className='block rounded-lg py-2 pl-6 pr-3 text-textColor hover:text-textHover'
    >
      {title}
    </Link>
  )
}
