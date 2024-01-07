import { CustomLink } from '@/components/CustomLink'
import Section from '@/components/Section'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { LandingSale } from '.prisma/client'
import { FC } from 'react'

type Props = {
  section: LandingSale
}

export const LandingSaleClient: FC<Props> = ({ section }) => {
  return (
    <Section
      aria-labelledby='sale-heading'
      className='relative overflow-hidden'
    >
      <h2 id='sale-heading' className='sr-only'>
        Sale Section
      </h2>
      <div className='relative flex flex-col items-center text-center'>
        <div className='max-w-2xl lg:max-w-none'>
          <Heading2 fontLarge value={section.title} />
          <Paragraph
            fontLarge
            value={section.description}
            className='mx-auto my-6 max-w-xl'
          />
          <CustomLink
            title={section.linkTitle}
            href='#'
            className='px-8 py-3 sm:w-auto inline-block'
          />
        </div>
      </div>
    </Section>
  )
}
