'use client'
import { FC, useState } from 'react'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { Heading3 } from '@/components/text/Heading3'
import { AboutMission } from '.prisma/client'
import { AboutMissionUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/mission/AboutMissionUpdate'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'

type Props = {
  section: AboutMission
}
export const AboutMissionAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
      <AboutMissionUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <Heading2 fontLarge value={section.title} />
      <div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
        <div className='lg:w-full lg:max-w-2xl lg:flex-auto leading-8'>
          <Paragraph value={section.description1} />
          <Paragraph className='mt-8' value={section.description2} />
          <Paragraph className='mt-8' value={section.description3} />
        </div>
        <div className='lg:flex lg:flex-auto lg:justify-center'>
          <dl className='flex justify-between lg:flex-col'>
            <div className='flex flex-col-reverse gap-y-4'>
              <Heading3 fontSmall value={section.goalDescription1} />
              <Heading3 fontLarge value={section.goalTitle1} />
            </div>
            <div className='flex flex-col-reverse gap-y-4'>
              <Heading3 fontSmall value={section.goalDescription2} />
              <Heading3 fontLarge value={section.goalTitle2} />
            </div>{' '}
            <div className='flex flex-col-reverse gap-y-4'>
              <Heading3 fontSmall value={section.goalDescription3} />
              <Heading3 fontLarge value={section.goalTitle3} />
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
