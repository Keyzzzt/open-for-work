import { FC, ReactNode } from 'react'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { NewStoryForm } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/NewStoryForm'
import { EditStoryForm } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/EditStoryForm'

type Props = {
  params: {
    storyId: string
  }
}

const StoryPage: FC<Props> = async ({ params }) => {
  let toRender: ReactNode

  try {
    if (params.storyId === 'create') {
      const blog = await prismaClient.blogPage.findFirst({})
      if (blog) {
        toRender = <NewStoryForm blogPageId={blog.id} />
      } else {
        toRender = (
          <EmptyState title='Blog page not found, please check database.' />
        )
      }
    } else {
      const story = await prismaClient.blogItem.findUnique({
        where: {
          id: params.storyId,
        },
        include: { paragraphs: true },
      })
      if (story) {
        toRender = <EditStoryForm story={story} />
      } else {
        toRender = <EmptyState title='Story not found.' />
      }
    }
  } catch (err) {
    toRender = <EmptyState title='Something went wrong!' />
  }

  return toRender
}

export default StoryPage
