'use client'
import { FC, useState } from 'react'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { AboutValues } from '.prisma/client'
import { AboutValuesUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(values)/AboutValuesUpdate'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { AboutValueItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(values)/AboutValueItems'

export type ValuesProps = {
  section: AboutValues
}

export const AboutValuesAdmin: FC<ValuesProps> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AboutValuesUpdate
        data={section}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />

      <div className='mx-auto max-w-2xl lg:mx-0'>
        <Heading2 fontLarge value={section.title} />
        <Paragraph className='mt-6 leading-8' value={section.description} />
      </div>
      <AboutValueItems
        disabled1={section.disabled1}
        title1={section.title1}
        description1={section.description1}
        disabled2={section.disabled2}
        title2={section.title2}
        description2={section.description2}
        disabled3={section.disabled3}
        title3={section.title3}
        description3={section.description3}
      />
    </>
  )
}
