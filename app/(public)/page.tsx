import { LandingHeroClient } from '@/app/(public)/(c)/LandingHeroClient'
import { TrendingSectionClient } from '@/app/(public)/(c)/TrendingSectionClient'
import { LandingTestimonialsClient } from '@/app/(public)/(c)/LandingTestimonialsClient'
import { BlogSectionClient } from '@/app/(public)/(c)/BlogSectionClient'
import { LandingSaleClient } from '@/app/(public)/(c)/LandingSaleClient'
import { prismaClient } from '@/prisma/prismaClient'

const LandingPage = async () => {
  const blog = await prismaClient.blogPage.findFirst({
    include: {
      blogItems: {
        where: {
          isFeatured: true,
        },
      },
    },
  })

  const featuredProducts = await prismaClient.landingFeaturedProducts.findFirst(
    {},
  )
  const testimonials = await prismaClient.landingTestimonials.findFirst({
    include: { items: true },
  })

  const products = await prismaClient.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
    },
    take: 4,
  })

  const sale = await prismaClient.landingSale.findFirst({})

  return (
    <>
      <LandingHeroClient />
      {featuredProducts && !featuredProducts.disabled && (
        <TrendingSectionClient products={products} />
      )}
      {testimonials && !testimonials.disabled && (
        <LandingTestimonialsClient section={testimonials} />
      )}
      {blog && !blog.isLandingSectionDisabled && !blog.disabled && (
        <BlogSectionClient section={blog} />
      )}
      {sale && !sale.disabled && <LandingSaleClient section={sale} />}
    </>
  )
}

export default LandingPage
