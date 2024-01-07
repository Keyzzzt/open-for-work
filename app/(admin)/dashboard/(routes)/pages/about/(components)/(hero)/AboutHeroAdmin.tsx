'use client'
import { FC, useState } from 'react'
import Image from 'next/image'
import { Heading1 } from '@/components/text/Heading1'
import { Paragraph } from '@/components/text/Paragraph'
import { AboutHero } from '.prisma/client'
import { AddImage } from '@/components/AddImage'
import { AboutHeroUpdate } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(hero)/AboutHeroUpdate'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'

type Props = {
  section: AboutHero & { images: any[] }
}
export const AboutHeroAdmin: FC<Props> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AboutHeroUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />

      <div className='relative isolate overflow-hidden'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
          <Heading1
            className='max-w-2xl lg:col-span-2 xl:col-auto'
            value={section.title}
          />
          <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
            <Paragraph className='leading-8' value={section.description} />
          </div>
          {section.images.length > 0 ? (
            <Image
              width={400}
              height={400}
              src={section.images[0].url}
              alt=''
              className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            />
          ) : (
            <AddImage
              width={400}
              height={400}
              onClick={() => setIsOpen(true)}
              className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            />
          )}
        </div>
      </div>
    </>
  )
}
