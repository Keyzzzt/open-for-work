import { prismaClient } from '@/prisma/prismaClient'
import { Socials } from '@/app/(admin)/dashboard/(routes)/settings/socials/(c)/Socials'
import { EmptyState } from '@/components/EmptyState'

const SocialsPage = async () => {
  try {
    const socials = await prismaClient.social.findMany({})

    if (socials) {
      return <Socials socials={socials} />
    } else {
      return <EmptyState title='Socials not found. Check database.' />
    }
  } catch (err) {
    console.error('Failed to fetch socials', err)
    return <EmptyState title='Something went wrong' />
  }
}

export default SocialsPage
