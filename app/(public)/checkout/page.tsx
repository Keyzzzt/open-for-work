import { Checkout } from '@/app/(public)/checkout/(c)/Checkout'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'

const CheckoutPage = async () => {
  try {
    const config = await prismaClient.config.findFirst({})
    return <Checkout taxRate={config?.taxRate ? config.taxRate : 0} />
  } catch (err) {
    console.error('Failed to fetch config: ', err)
    return <EmptyState title='Something went wrong' />
  }
}

export default CheckoutPage
