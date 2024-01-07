import { FC } from 'react'
import { Heading2 } from '@/components/text/Heading2'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  title1: string
  result1: string
  description1: string
  disabled1: boolean

  title2: string
  result2: string
  description2: string
  disabled2: boolean

  title3: string
  result3: string
  description3: string
  disabled3: boolean
}
export const StatisticsItems: FC<Props> = ({
  result3,
  description3,
  description2,
  description1,
  result2,
  title3,
  title1,
  title2,
  result1,
  disabled3,
  disabled1,
  disabled2,
}) => {
  return (
    <div className='mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end'>
      {!disabled1 && (
        <div className='flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-lightGray p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start'>
          <Heading2 value={result1} />
          <div className='sm:w-80 sm:shrink lg:w-auto lg:flex-none'>
            <Heading3 value={title1} />
            <Paragraph className='mt-2' value={description1} />
          </div>
        </div>
      )}
      {!disabled2 && (
        <div className='flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-accent p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44'>
          <Heading2 className='text-white' value={result2} />
          <div className='sm:w-80 sm:shrink lg:w-auto lg:flex-none'>
            <Heading3 className='text-white' value={title2} />
            <Paragraph className='mt-2 text-white' value={description2} />
          </div>
        </div>
      )}
      {!disabled3 && (
        <div className='flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-accentActive p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28'>
          <Heading2 className='text-white' value={result3} />
          <div className='sm:w-80 sm:shrink lg:w-auto lg:flex-none'>
            <Heading3 className='text-white' value={title3} />
            <Paragraph className='mt-2 text-white' value={description3} />
          </div>
        </div>
      )}
    </div>
  )
}
