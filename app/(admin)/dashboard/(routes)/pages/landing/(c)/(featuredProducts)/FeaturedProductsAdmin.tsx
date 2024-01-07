'use client'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Heading2 } from '@/components/text/Heading2'
import { LandingFeaturedProducts, Product } from '.prisma/client'
import { TrendingProductCard } from '@/components/TrendingProductCard'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { FeaturedProductsUpdate } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(featuredProducts)/FeaturedProductsUpdate'

type Props = {
  section: LandingFeaturedProducts
  products: Array<Product & { images: any[] }>
}
// TODO page with featured products
export const FeaturedProductsAdmin: FC<Props> = ({ section, products }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <FeaturedProductsUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <div className='md:flex md:items-center md:justify-between'>
        <Heading2 value={section.title} />
        <Link
          href='#'
          className='hidden  text-textColor hover:text-textHover md:block'
        >
          {section.linkTitle}
          <span aria-hidden='true'> &rarr;</span>
        </Link>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
        {products.map((p) => (
          <TrendingProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className='mt-8 md:hidden'>
        <Link
          href='#'
          className='font-medium text-textColor hover:text-textHover'
        >
          Shop the collection
          <span aria-hidden='true'> &rarr;</span>
        </Link>
      </div>
    </div>
  )
}
