import { FC } from 'react'
import Link from 'next/link'
import { Product } from '.prisma/client'
import Section from '@/components/Section'
import { Heading2 } from '@/components/text/Heading2'
import { TrendingProductCard } from '@/components/TrendingProductCard'

type Props = {
  products: Array<Product & { images: any[] }>
}

export const TrendingSectionClient: FC<Props> = ({ products }) => {
  if (products.length === 0) {
    return null
  }
  return (
    <Section aria-labelledby='trending-heading'>
      <h2 id='trending-heading' className='sr-only'>
        Trending Section
      </h2>
      <div className='md:flex md:items-center md:justify-between'>
        <Heading2 value='Trending Products' />
        <Link
          href='#'
          className='hidden text-textColor hover:text-textHover md:block'
        >
          Shop the collection
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
          className='font-medium  text-textColor hover:text-textHover'
        >
          Shop the collection
          <span aria-hidden='true'> &rarr;</span>
        </Link>
      </div>
    </Section>
  )
}
