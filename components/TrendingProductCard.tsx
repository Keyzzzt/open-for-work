import { FC } from 'react'
import Link from 'next/link'
import { Product } from '.prisma/client'
import Image from 'next/image'
import { NoImage } from '@/components/NoImage'

type Props = {
  product: Product & { images: any[] }
}

export const TrendingProductCard: FC<Props> = ({ product }) => {
  return (
    <div key={product.id} className='group relative'>
      <div className='h-56 w-full overflow-hidden rounded-md group-hover:opacity-50 lg:h-72 xl:h-80'>
        {product.images.length > 0 ? (
          <Image
            height={300}
            width={300}
            src={product.images[0].url}
            alt='product'
            className='h-full w-full object-cover object-center'
          />
        ) : (
          <NoImage width={300} height={300} />
        )}
      </div>
      <h3 className='mt-4 text-center'>
        <Link href={`/products/${product.id}`}>
          <span className='absolute top-0 left-0 right-0 bottom-0' />
          {product.title}
        </Link>
      </h3>
      <p className='mt-1 text-center'>{product.price}</p>
    </div>
  )
}
