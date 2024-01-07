import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  TParagraph,
  TParagraphFields,
} from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/NewStoryForm'
import {
  CustomFile,
  RejectedFile,
} from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'
import { Dropzone } from '@/components/Dropzone'
import { IconButtonHover } from '@/components/IconButtonHover'
import { CiTrash } from 'react-icons/ci'
import { Paragraph } from '@/components/text/Paragraph'
import { ParagraphNav } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/ParagraphNav'

type Props = {
  paragraph: TParagraph | (CustomFile & TParagraph)
  onChange: (
    type: 'text' | 'video' | 'image',
    id: string,
    field: TParagraphFields,
    value: string | null,
    image?: CustomFile,
  ) => void
  onDelete: (id: string) => void
  onSwapPosition: (direction: 'up' | 'down', currentPosition: number) => void
  onParagraphImageDelete?: (publicId: string, paragraphId: string) => void
  position: number
  lastPosition: number
}
export const StoryParagraphAdmin: FC<Props> = ({
  onChange,
  onDelete,
  position,
  paragraph,
  lastPosition,
  onSwapPosition,
  onParagraphImageDelete,
}) => {
  const [selectedImages, setSelectedImages] = useState<CustomFile[]>([])
  const [rejectedImages, setRejectedImages] = useState<RejectedFile[]>([])

  useEffect(() => {
    if (selectedImages.length > 0) {
      onChange('image', paragraph.id, 'content', null, selectedImages[0])
      setSelectedImages([])
    }
  }, [selectedImages, onChange, paragraph.id])

  return (
    <>
      {paragraph.type === 'text' && (
        <div className='border border-borderColor rounded-md p-4 '>
          <div className='flex justify-between mb-4'>
            <Paragraph value='Text section' />
            <ParagraphNav
              lastPosition={lastPosition}
              id={paragraph.id}
              position={position}
              onDelete={onDelete}
              onSwapPosition={onSwapPosition}
            />
          </div>
          <input
            onChange={(e) =>
              onChange('text', paragraph.id, 'title', e.target.value)
            }
            className='mt-1 remove-tw-outline text-textColor block w-full rounded-md py-1.5 border-borderColor focus:outline-none mb-4'
            placeholder='Leave blank if no title needed'
            defaultValue={paragraph.title}
          />
          <textarea
            onChange={(e) =>
              onChange('text', paragraph.id, 'content', e.target.value)
            }
            className='mt-1 remove-tw-outline text-textColor block w-full rounded-md py-1.5 border-borderColor focus:outline-none'
            placeholder='Your text here...'
            defaultValue={paragraph.content}
          />
        </div>
      )}
      {paragraph.type === 'video' && (
        <div className='border border-borderColor rounded-md p-4 '>
          <div className='flex justify-between mb-4'>
            <Paragraph value='Video section' />
            <ParagraphNav
              lastPosition={lastPosition}
              id={paragraph.id}
              position={position}
              onDelete={onDelete}
              onSwapPosition={onSwapPosition}
            />
          </div>
          <input
            defaultValue={paragraph.content}
            placeholder='Enter video link'
            onChange={(e) =>
              onChange('video', paragraph.id, 'content', e.target.value)
            }
            className='mt-1 remove-tw-outline text-textColor block w-full rounded-md py-1.5 border-borderColor focus:outline-none'
          />
        </div>
      )}

      {paragraph.type === 'image' && !paragraph.image && !paragraph.url && (
        <div className='border border-borderColor rounded-md p-4'>
          <div className='flex justify-between mb-4'>
            <Paragraph value='Image section' />
            <ParagraphNav
              lastPosition={lastPosition}
              id={paragraph.id}
              position={position}
              onDelete={onDelete}
              onSwapPosition={onSwapPosition}
            />
          </div>
          <Dropzone
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            rejectedImages={rejectedImages}
            setRejectedImages={setRejectedImages}
          />
        </div>
      )}

      {((paragraph.type === 'image' && paragraph.image) || paragraph.url) && (
        <div className='relative group border border-borderColor rounded-md p-4'>
          <div className='flex justify-between mb-4'>
            <Paragraph value='Image section' />
            <ParagraphNav
              lastPosition={lastPosition}
              id={paragraph.id}
              position={position}
              onDelete={onDelete}
              onSwapPosition={onSwapPosition}
            />
          </div>
          <Image
            className='mx-auto aspect-video rounded-xl bg-gray-50 object-cover w-full h-96'
            src={
              paragraph.url
                ? paragraph.url
                : paragraph.image
                ? paragraph.image.preview
                : ''
            }
            alt='paragraph image'
            width={1000}
            height={300}
          />
          {onParagraphImageDelete && (
            <IconButtonHover
              items={[
                {
                  onClick: () =>
                    onParagraphImageDelete(paragraph.public_id!, paragraph.id),
                  icon: <CiTrash size={28} />,
                },
              ]}
            />
          )}
        </div>
      )}
    </>
  )
}
