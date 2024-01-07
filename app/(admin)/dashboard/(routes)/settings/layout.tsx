import { FC, ReactNode } from 'react'
import { AdminSubMenu } from '@/components/AdminSubMenu'

type Props = {
  children: ReactNode
}
const tabs = [
  {
    name: 'Configuration',
    href: '/dashboard/settings/configuration',
  },
  {
    name: 'Socials',
    href: '/dashboard/settings/socials',
  },
  {
    name: 'Recommendations',
    href: '/dashboard/settings/recommendations',
  },
]

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AdminSubMenu tabs={tabs} title='Settings' />
      {children}
    </>
  )
}

export default Layout
