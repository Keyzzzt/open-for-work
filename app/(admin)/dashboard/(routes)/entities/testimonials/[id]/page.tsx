import { FC, ReactNode } from 'react'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { NewTestimonialForm } from '@/app/(admin)/dashboard/(routes)/entities/testimonials/(c)/NewTestimonialForm'
import { EditTestimonialForm } from '@/app/(admin)/dashboard/(routes)/entities/testimonials/(c)/EditTestimonialForm'

type Props = {
  params: {
    id: string
  }
}

const StoryPage: FC<Props> = async ({ params }) => {
  let toRender: ReactNode
  try {
    const page = await prismaClient.landingTestimonials.findFirst({})
    if (page) {
      if (params.id === 'create') {
        toRender = <NewTestimonialForm pageId={page.id} />
      } else {
        const testimonial = await prismaClient.testimonialItem.findUnique({
          where: {
            id: params.id,
          },
        })
        if (!testimonial) {
          toRender = <EmptyState title='Testimonial not found.' />
        } else {
          toRender = <EditTestimonialForm testimonial={testimonial} />
        }
      }
    } else {
      toRender = <EmptyState title='Testimonial page not found.' />
    }
  } catch (err) {
    console.error('Failed to fetch testimonial: ', err)
    toRender = <EmptyState title='Something went wrong' />
  }
  return toRender
}

export default StoryPage
