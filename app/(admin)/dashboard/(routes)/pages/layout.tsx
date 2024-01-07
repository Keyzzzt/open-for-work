import { FC, ReactNode } from 'react'
import { AdminSubMenu } from '@/components/AdminSubMenu'

type Props = {
  children: ReactNode
}
const tabs = [
  {
    name: 'Landing',
    href: '/dashboard/pages/landing?section=hero',
  },
  {
    name: 'About',
    href: '/dashboard/pages/about?section=hero',
  },
  {
    name: 'FAQ',
    href: '/dashboard/pages/faq',
  },
  {
    name: 'Blog',
    href: '/dashboard/pages/blog',
  },
]

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AdminSubMenu tabs={tabs} title='Pages' />
      <div className='mb-10'>{children}</div>
    </>
  )
}

export default Layout
