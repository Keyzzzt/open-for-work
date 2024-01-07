import { FC } from 'react'
import Section from '@/components/Section'
import { LandingTestimonials, TestimonialItem } from '.prisma/client'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  section: LandingTestimonials & { items: TestimonialItem[] }
}

export const LandingTestimonialsClient: FC<Props> = ({ section }) => {
  return (
    <Section aria-labelledby='testimonial-heading' className='relative'>
      <h2 id='testimonial-heading' className='sr-only'>
        Testimonials Section
      </h2>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <Heading2 value={section.title} id='testimonial-heading' />
        <div className='mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0'>
          {section.items.map((t) => (
            <blockquote key={t.id} className='sm:flex lg:block'>
              <svg
                width={24}
                height={18}
                viewBox='0 0 24 18'
                aria-hidden='true'
                className='flex-shrink-0'
              >
                <path
                  d='M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z'
                  fill='currentColor'
                />
              </svg>
              <div className='mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10'>
                <Paragraph value={t.content} />
                <cite className='mt-4 block text-textSecondary font-semibold not-italic'>
                  {t.author}
                </cite>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  )
}
