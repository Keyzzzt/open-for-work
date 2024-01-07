import { ReactNode } from 'react'
import { AdminNavbar } from '@/components/AdminNavbar'
import { FooterAdmin } from '@/components/FooterAdmin'
import { prismaClient } from '@/prisma/prismaClient'
export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const socials = await prismaClient.social.findMany({})

  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
      <FooterAdmin socials={socials} />
    </>
  )
}
