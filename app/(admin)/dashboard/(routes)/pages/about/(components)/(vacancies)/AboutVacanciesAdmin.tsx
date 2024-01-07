'use client'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import Image from 'next/image'
import { AboutVacancies } from '.prisma/client'
import { FC, useState } from 'react'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { VacancyItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(vacancies)/VacancyItems'
import { AboutVacanciesUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(vacancies)/AboutVacanciesUpdate'

export type AboutJobsType = AboutVacancies & { images: any[] }

type Props = {
  section: AboutJobsType
}
export const AboutVacanciesAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <AboutVacanciesUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <div className='mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row'>
        <div className='w-full lg:max-w-lg lg:flex-auto'>
          <Heading2 fontLarge value={section.title} />
          <Paragraph className='mt-6' value={section.description} />

          <Image
            width={400}
            height={400}
            src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80'
            alt=''
            className='mt-16 aspect-[6/5] w-full rounded-2xl object-cover lg:aspect-auto lg:h-[34.5rem]'
          />
        </div>
        <VacancyItems
          title1={section.title1}
          description1={section.description1}
          salary1={section.salary1}
          city1={section.city1}
          disabled1={section.disabled1}
          title2={section.title2}
          description2={section.description2}
          salary2={section.salary2}
          city2={section.city2}
          disabled2={section.disabled2}
          title3={section.title3}
          description3={section.description3}
          salary3={section.salary3}
          city3={section.city3}
          disabled3={section.disabled3}
        />
      </div>
    </div>
  )
}
