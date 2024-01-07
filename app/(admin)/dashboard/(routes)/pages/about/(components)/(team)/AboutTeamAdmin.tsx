'use client'
import { FC, useState } from 'react'
import Image from 'next/image'
import { AboutTeam } from '.prisma/client'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { AboutTeamUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(team)/AboutTeamUpdate'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'

type Props = {
  section: AboutTeam & { images: any[] }
}

export const AboutTeamAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AboutTeamUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />

      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <div className='relative lg:flex overflow-hidden'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-12 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8 lg:gap-x-8'>
          <div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8  leading-8'>
            <Heading2 fontLarge value={section.title} />
            <Paragraph className='mt-8' value={section.description1} />
            <Paragraph className='mt-8' value={section.description2} />
          </div>
          <div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
            <div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
              <Image
                width={400}
                height={400}
                src='https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80'
                alt='team members'
                className='aspect-[7/5] w-full lg:w-[37rem] max-w-none rounded-2xl object-cover'
              />
            </div>
            <div className='hidden lg:contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8'>
              <div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
                <Image
                  width={400}
                  height={400}
                  src='https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80'
                  alt='team members'
                  className='aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl object-cover'
                />
              </div>
              <div className='lg:w-auto'>
                <Image
                  width={400}
                  height={400}
                  src='https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80'
                  alt='team members'
                  className='aspect-[4/3] w-[37rem] max-w-none rounded-2xl object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
