'use client'
import { FC } from 'react'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  date: string
  dateTime: string
  title: string
  description: string
  disabled: boolean
}

export const TimelineItem: FC<Props> = ({
  date,
  dateTime,
  title,
  description,
  disabled,
}) => {
  if (disabled) return null

  return (
    <div className='group relative'>
      <time
        dateTime={dateTime}
        className='flex items-center font-semibold text-accent'
      >
        <svg
          viewBox='0 0 4 4'
          className='mr-4 h-1 w-1 flex-none'
          aria-hidden='true'
        >
          <circle cx={2} cy={2} r={2} fill='currentColor' />
        </svg>
        <Paragraph value={date} />

        <div
          className='absolute -ml-2 h-px w-screen -translate-x-full bg-accent sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0'
          aria-hidden='true'
        />
      </time>
      <Paragraph value={title} className='my-2' />
      <Paragraph
        value={description}
        className='my-2 leading-7 text-textSecondary'
      />
    </div>
  )
}
