'use client'
import { FC, useState } from 'react'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { AboutStatistics } from '.prisma/client'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { AboutStatisticsUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(statisticts)/AboutStatisticsUpdate'
import { StatisticsItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(statisticts)/StatisticsItems'

type Props = {
  section: AboutStatistics
}

export const AboutStatisticsAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <AboutStatisticsUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <div className='mx-auto max-w-2xl lg:mx-0'>
        <Heading2 fontLarge value={section.title} />
        <Paragraph className='mt-6 leading-7' value={section.description} />
      </div>
      <StatisticsItems
        title1={section.title1}
        result1={section.result1}
        description1={section.description1}
        disabled1={section.disabled1}
        title2={section.title2}
        result2={section.result2}
        description2={section.description2}
        disabled2={section.disabled2}
        title3={section.title3}
        result3={section.result3}
        description3={section.description3}
        disabled3={section.disabled3}
      />
    </div>
  )
}
