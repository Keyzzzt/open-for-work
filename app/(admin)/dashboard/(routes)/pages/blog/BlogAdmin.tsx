'use client'
import { BlogItem, BlogPage } from '.prisma/client'
import { Heading2 } from '@/components/text/Heading2'
import { FC, useState } from 'react'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { BlogPageUpdate } from '@/app/(admin)/dashboard/(routes)/pages/blog/BlogPageUpdate'
import Section from '@/components/Section'
import { Heading1 } from '@/components/text/Heading1'
import { EmptyState } from '@/components/EmptyState'
import { BlogCart } from '@/app/(public)/blog/(c)/BlogCart'

type Props = {
  section: BlogPage
  blogItems: Array<BlogItem & { paragraphs: any[] }>
}
export const BlogAdmin: FC<Props> = ({ section, blogItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <BlogPageUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        blog={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />

      <Section>
        <Heading1 value={section.title} />
        <Heading2 value={section.description} className='mt-10' />

        {blogItems.length === 0 ? (
          <EmptyState title='Blog stories not found' />
        ) : (
          <div className='mt-10 gap-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            {blogItems.map((b) => (
              <BlogCart key={b.id} blogItem={b} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
