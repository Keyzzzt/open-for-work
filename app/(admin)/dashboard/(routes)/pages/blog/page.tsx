import { prismaClient } from '@/prisma/prismaClient'
import { BlogAdmin } from '@/app/(admin)/dashboard/(routes)/pages/blog/BlogAdmin'
import { ReactNode } from 'react'
import { EmptyState } from '@/components/EmptyState'

const BlogPageAdmin = async () => {
  let toRender: ReactNode
  try {
    const blog = await prismaClient.blogPage.findFirst({})
    const blogItems = await prismaClient.blogItem.findMany({
      where: { disabled: false },
      include: { paragraphs: true },
    })

    if (blog) {
      toRender = <BlogAdmin section={blog} blogItems={blogItems} />
    } else {
      toRender = <EmptyState title='Blog page not found.' />
    }
  } catch (err) {
    console.error('Failed to fetch blog page: ', err)
    toRender = <EmptyState title='Something went wrong' />
  }

  return toRender
}

export default BlogPageAdmin
