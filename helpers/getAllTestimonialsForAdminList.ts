import { prismaClient } from '@/prisma/prismaClient'
import { format } from 'date-fns'
import { sleep } from '@/helpers/sleep'

export type TestimonialListType = {
  id: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  disabled: boolean
  featured: boolean
}

export const getAllTestimonialsForAdminList = async () => {
  try {
    const testimonials = await prismaClient.testimonialItem.findMany({})

    const formatted: TestimonialListType[] = testimonials.map((t) => ({
      id: t.id,
      author: t.author,
      content: t.content,
      featured: t.featured,
      disabled: t.disabled,
      updatedAt: format(t.updatedAt, 'MMMM do, yyyy'),
      createdAt: format(t.createdAt, 'MMMM do, yyyy'),
    }))

    await sleep(2000)
    return { data: formatted }
  } catch (err) {
    console.error('Failed to fetch testimonials: ', err)
    return { data: [] }
  }
}
