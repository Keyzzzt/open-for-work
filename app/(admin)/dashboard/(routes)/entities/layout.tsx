import { FC, ReactNode } from 'react'
import { AdminSubMenu } from '@/components/AdminSubMenu'

type Props = {
  children: ReactNode
}
const tabs = [
  {
    name: 'Products',
    href: '/dashboard/entities/products',
  },
  {
    name: 'Orders',
    href: '/dashboard/entities/orders',
  },
  {
    name: 'FAQ',
    href: '/dashboard/entities/faq',
  },
  {
    name: 'Stories',
    href: '/dashboard/entities/stories',
  },
  {
    name: 'Testimonials',
    href: '/dashboard/entities/testimonials',
  },
]

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AdminSubMenu tabs={tabs} title='Pages' />
      {children}
    </>
  )
}

export default Layout
