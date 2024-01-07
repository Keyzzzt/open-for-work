import { ReactNode } from 'react'
import { HeaderClient } from '@/components/client/HeaderClient'
import { FooterClient } from '@/components/client/FooterClient'
import { prismaClient } from '@/prisma/prismaClient'
import { CartItemsContextProvider } from '@/contexts/CartItemsContext'

export default async function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  const allProductsCategory = await prismaClient.category.findUnique({
    where: {
      title: 'All',
    },
  })

  const socials = await prismaClient.social.findMany({})

  return (
    <CartItemsContextProvider>
      <HeaderClient allCategoryId={allProductsCategory?.id} />
      <main>{children}</main>
      <FooterClient socials={socials} />
    </CartItemsContextProvider>
  )
}
