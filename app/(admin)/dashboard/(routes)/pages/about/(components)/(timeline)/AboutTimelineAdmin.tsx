'use client'
import { FC, useState } from 'react'
import { TimelineItem } from './TimelineItem'
import { AboutTimelineUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(timeline)/AboutTimelineUpdate'
import { AboutTimeline } from '@prisma/client'
import { Heading2 } from '@/components/text/Heading2'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'

type Props = {
  section: AboutTimeline
}
export const AboutTimelineAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AboutTimelineUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />

      <div className='relative mx-auto max-w-2xl lg:max-w-none'>
        <Heading2 className='mb-10' fontLarge value={section.mainTitle} />

        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          <TimelineItem
            date={section.date1}
            dateTime={section.dateTime1}
            title={section.title1}
            description={section.description1}
            disabled={section.disabled1}
          />
          <TimelineItem
            date={section.date2}
            dateTime={section.dateTime2}
            title={section.title2}
            description={section.description2}
            disabled={section.disabled2}
          />
          <TimelineItem
            date={section.date3}
            dateTime={section.dateTime3}
            title={section.title3}
            description={section.description3}
            disabled={section.disabled3}
          />
          <TimelineItem
            date={section.date4}
            dateTime={section.dateTime4}
            title={section.title4}
            description={section.description4}
            disabled={section.disabled4}
          />
        </div>
      </div>
    </>
  )
}
