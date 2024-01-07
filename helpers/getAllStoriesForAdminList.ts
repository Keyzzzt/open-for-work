import { prismaClient } from '@/prisma/prismaClient'
import { format } from 'date-fns'
import { sleep } from '@/helpers/sleep'

export type StoryListType = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  disabled: boolean
  isFeatured: boolean
}
export const getAllStoriesForAdminList = async () => {
  try {
    const stories = await prismaClient.blogItem.findMany({
      include: { paragraphs: true },
    })

    const formatted: StoryListType[] = stories.map((story) => ({
      id: story.id,
      title: story.title,
      createdAt: format(story.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(story.updatedAt, 'MMMM do, yyyy'),
      disabled: story.disabled,
      isFeatured: story.isFeatured,
    }))

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    console.error('Failed to fetch stories: ', err)
    return { data: [] }
  }
}
