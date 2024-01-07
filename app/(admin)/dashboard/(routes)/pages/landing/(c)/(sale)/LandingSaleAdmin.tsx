'use client'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { CustomLink } from '@/components/CustomLink'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { FC, useState } from 'react'
import { LandingSale } from '.prisma/client'
import { SaleUpdate } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(sale)/SaleUpdate'

type Props = {
  section: LandingSale
}
export const LandingSaleAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SaleUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
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
    </>
  )
}
