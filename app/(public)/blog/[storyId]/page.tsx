import { FC } from 'react'
import Image from 'next/image'
import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { Heading1 } from '@/components/text/Heading1'
import { Heading2 } from '@/components/text/Heading2'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'
import Section from '@/components/Section'

type Props = {
  params: { storyId: string }
}
const StoryPage: FC<Props> = async ({ params }) => {
  try {
    const story = await prismaClient.blogItem.findUnique({
      where: { id: params.storyId },
      include: { paragraphs: true },
    })
    if (!story) {
      return <EmptyState title='Story not found' />
    } else {
      return (
        <Section>
          <Heading1 value={story.title} className='text-center' />
          <Heading2 value={story.description} className='mt-8 text-center' />
          {story.url && (
            <div className='flex justify-center aspect-h-2 aspect-w-5 overflow-hidden'>
              <Image
                src={story.url}
                height={100}
                width={1000}
                alt='story image'
                className='my-20 h-full w-full object-cover object-center'
              />
            </div>
          )}
          {story.paragraphs.map((p) => {
            if (p.type === 'text') {
              return (
                <div key={p.id} className='mt-10'>
                  {p.title && <Heading3 value={p.title} className='mb-4' />}
                  <Paragraph value={p.content ? p.content : ''} />
                </div>
              )
            }

            if (p.type === 'image' && p.url) {
              return (
                <div key={p.id} className='flex justify-center mt-10'>
                  <Image
                    key={p.id}
                    src={p.url}
                    height={100}
                    width={1000}
                    alt='paragraph image'
                  />
                </div>
              )
            }

            if (p.type === 'video' && p.content) {
              const arr = p.content.split('=')
              const link = `https://www.youtube.com/embed/${
                arr[arr.length - 1]
              }`

              return (
                <div key={p.id} className='flex justify-center mt-10'>
                  <iframe
                    width='560'
                    height='315'
                    src={link}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                  />
                </div>
              )
            }
          })}
        </Section>
      )
    }
  } catch (err) {
    return <EmptyState title='Something went wrong' />
  }
}

export default StoryPage
