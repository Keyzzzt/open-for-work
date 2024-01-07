'use client'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { Heading3 } from '@/components/text/Heading3'
import { NoImage } from '@/components/NoImage'
import { BlogItem, BlogPage } from '.prisma/client'

type Props = {
  section: BlogPage & { blogItems: BlogItem[] }
}

export const BlogSectionClient: FC<Props> = ({ section }) => {
  return (
    <Section
      aria-labelledby='blog-heading'
      className='max-w-2xl lg:max-w-none mx-auto'
    >
      <h2 id='blog-heading' className='sr-only'>
        Blog Section
      </h2>
      <Heading2 fontLarge value={section.title} />
      <Paragraph value={section.description} className='mt-4' />

      <div className='mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0 mx-auto'>
        {section.blogItems.map((b) => (
          <Link key={b.id} href={`/blog?item=${b.id}`} className='group block'>
            <div
              aria-hidden='true'
              className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75'
            >
              {b.url ? (
                <Image
                  width={400}
                  height={400}
                  src={b.url}
                  alt='blog image'
                  className='h-full w-full object-cover object-center'
                />
              ) : (
                <NoImage width={400} height={400} />
              )}
            </div>
            <Heading3 value={b.title} className='mt-4' />
            <Paragraph value={b.description} className='mt-2' />
          </Link>
        ))}
      </div>
    </Section>
  )
}
