import { Dispatch, FC, SetStateAction } from 'react'
import { CustomButton } from '@/components/CustomButton'
import { TParagraph } from './NewStoryForm'

type Props = {
  setParagraphs: Dispatch<SetStateAction<TParagraph[]>>
}

export const AddParagraphNav: FC<Props> = ({ setParagraphs }) => {
  return (
    <div className='flex justify-end items-center mb-10'>
      <CustomButton
        type='button'
        onClick={() => {
          setParagraphs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: 'text',
              title: '',
              content: '',
            },
          ])
        }}
        fill='blank'
        title='Add text'
      />
      <CustomButton
        type='button'
        onClick={() =>
          setParagraphs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: 'video',
              title: '',
              content: '',
            },
          ])
        }
        fill='blank'
        title='Add video'
      />
      <CustomButton
        type='button'
        onClick={() =>
          setParagraphs((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              type: 'image',
              title: '',
              content: '',
            },
          ])
        }
        fill='blank'
        title='Add image'
      />
    </div>
  )
}
