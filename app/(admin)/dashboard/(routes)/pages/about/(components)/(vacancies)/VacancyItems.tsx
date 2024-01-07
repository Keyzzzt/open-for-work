'use client'
import { FC } from 'react'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'
import { CustomLink } from '@/components/CustomLink'

type Props = {
  title1: string
  description1: string
  salary1: string
  city1: string
  disabled1: boolean

  title2: string
  description2: string
  salary2: string
  city2: string
  disabled2: boolean

  title3: string
  description3: string
  salary3: string
  city3: string
  disabled3: boolean
}

export const VacancyItems: FC<Props> = ({
  city3,
  city1,
  city2,
  salary3,
  salary2,
  salary1,
  disabled2,
  disabled3,
  disabled1,
  title3,
  title1,
  title2,
  description3,
  description2,
  description1,
}) => {
  return (
    <div className='w-full lg:max-w-xl lg:flex-auto'>
      <ul className='-my-8 divide-y divide-borderColor'>
        {!disabled1 && (
          <li className='py-8'>
            <div className='relative flex flex-wrap gap-x-3'>
              <div className='w-full flex-none text-lg font-semibold'>
                <Heading3 className='hover:text-textHover' value={title1} />
              </div>

              <Paragraph value={description1} />
              <Paragraph className='mt-4' value={salary1} />
              <Paragraph className='mt-4' value={city1} />
            </div>
          </li>
        )}{' '}
        {!disabled2 && (
          <li className='py-8'>
            <div className='relative flex flex-wrap gap-x-3'>
              <div className='w-full flex-none text-lg font-semibold'>
                <Heading3 className='hover:text-textHover' value={title2} />
              </div>

              <Paragraph value={description2} />
              <Paragraph className='mt-4' value={salary2} />
              <Paragraph className='mt-4' value={city2} />
            </div>
          </li>
        )}{' '}
        {!disabled3 && (
          <li className='py-8'>
            <div className='relative flex flex-wrap gap-x-3'>
              <div className='w-full flex-none text-lg font-semibold'>
                <Heading3 className='hover:text-textHover' value={title3} />
              </div>

              <Paragraph value={description3} />
              <Paragraph className='mt-4' value={salary3} />
              <Paragraph className='mt-4' value={city3} />
            </div>
          </li>
        )}
      </ul>
      <div className='mt-8 flex border-t border-borderColor pt-8'>
        <CustomLink title='Contact us' href='/contact' />
      </div>
    </div>
  )
}
