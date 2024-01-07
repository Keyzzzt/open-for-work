import { Heading1 } from '@/components/text/Heading1'
import { Heading2 } from '@/components/text/Heading2'
import { BlogCart } from '@/app/(public)/blog/(c)/BlogCart'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import Section from '@/components/Section'

const BlogPage = async () => {
  const blog = await prismaClient.blogPage.findFirst({})

  if (!blog) {
    return <EmptyState title='Blog page not found' />
  }

  const blogItems = await prismaClient.blogItem.findMany({
    where: { disabled: false },
    include: { paragraphs: true },
  })

  return (
    <Section>
      <Heading1 value={blog.title} />
      <Heading2 value={blog.description} className='mt-10' />

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
  )
}

export default BlogPage
