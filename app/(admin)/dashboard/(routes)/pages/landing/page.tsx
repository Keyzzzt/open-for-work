import { LandingMain } from '@/app/(admin)/dashboard/(routes)/pages/landing/LandingMain'
import { LandingHeroAdmin } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/LandingHeroAdmin'
import { FeaturedProductsAdmin } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(featuredProducts)/FeaturedProductsAdmin'
import { LandingTestimonialsAdmin } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(testimonials)/LandingTestimonialsAdmin'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { LandingSaleAdmin } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(sale)/LandingSaleAdmin'

const LandingPageAdmin = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const section =
    typeof searchParams.section === 'string' ? searchParams.section : ''

  let toRender = <EmptyState title='No data. Please check database' />

  try {
    switch (section) {
      case 'hero':
        toRender = <LandingHeroAdmin />
        break
      case 'trending':
        {
          const section = await prismaClient.landingFeaturedProducts.findFirst(
            {},
          )
          if (!section) {
            return <EmptyState title='Featured products section not found.' />
          }
          const products = await prismaClient.product.findMany({
            where: {
              isFeatured: true,
            },
            include: {
              images: true,
            },
            take: 4,
          })
          toRender = (
            <FeaturedProductsAdmin section={section} products={products} />
          )
        }

        break
      case 'testimonials':
        {
          const section = await prismaClient.landingTestimonials.findFirst({})
          const items = await prismaClient.testimonialItem.findMany({
            orderBy: {
              createdAt: 'asc',
            },
          })

          if (!section) {
            return <EmptyState title='Testimonials section not found.' />
          }

          toRender = (
            <LandingTestimonialsAdmin section={section} items={items} />
          )
        }
        break
      case 'sale':
        {
          const section = await prismaClient.landingSale.findFirst({})
          if (!section) {
            return <EmptyState title='Sale section not found.' />
          }
          toRender = <LandingSaleAdmin section={section} />
        }
        break
    }
  } catch (err) {
    console.error('Failed to fetch landing page: ', err)
    toRender = <EmptyState title='Something went wrong' />
  }

  return <LandingMain currentSection={section}>{toRender}</LandingMain>
}

export default LandingPageAdmin
