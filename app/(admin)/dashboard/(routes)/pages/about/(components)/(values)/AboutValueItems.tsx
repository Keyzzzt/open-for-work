import { FC } from 'react'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  disabled1: boolean
  title1: string
  description1: string

  disabled2: boolean
  title2: string
  description2: string

  disabled3: boolean
  title3: string
  description3: string
}

export const AboutValueItems: FC<Props> = ({
  description1,
  disabled1,
  title1,
  description3,
  disabled2,
  disabled3,
  title2,
  title3,
  description2,
}) => {
  return (
    <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
      {!disabled1 && (
        <div>
          <Heading3 value={title1} />
          <Paragraph value={description1} />
        </div>
      )}{' '}
      {!disabled2 && (
        <div>
          <Heading3 value={title2} />
          <Paragraph value={description2} />
        </div>
      )}{' '}
      {!disabled3 && (
        <div>
          <Heading3 value={title3} />
          <Paragraph value={description3} />
        </div>
      )}
    </div>
  )
}
