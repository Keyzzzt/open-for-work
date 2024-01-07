import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogItem } from '.prisma/client'
import { NoImage } from '@/components/NoImage'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  blogItem: BlogItem & { paragraphs: any[] }
}

export const BlogCart: FC<Props> = ({ blogItem }) => {
  return (
    <Link href={`/blog/${blogItem.id}`} className='group block'>
      <div
        aria-hidden='true'
        className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75'
      >
        {blogItem.url ? (
          <Image
            width={400}
            height={400}
            src={blogItem.url}
            alt='blog image'
            className='h-full w-full object-cover object-center'
          />
        ) : (
          <NoImage width={400} height={400} />
        )}
      </div>
      <Heading3 value={blogItem.title} className='mt-4' />
      <Paragraph value={blogItem.description} className='mt-2' />
    </Link>
  )
}
