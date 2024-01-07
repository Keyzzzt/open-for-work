'use client'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Dropzone } from '@/components/Dropzone'
import { FeedbackError } from '@/components/FeedbackError'
import { getSignature } from '@/helpers/imageUpload'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { storySchema, TStorySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { UploadedImage } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'
import {
  CustomFile,
  RejectedFile,
} from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'
import { handleStoryFieldValidation, swapParagraphs } from '@/lib/utils'
import { StoryParagraphAdmin } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/StoryParagraphAdmin'
import { Paragraph } from '@/components/text/Paragraph'
import { AddParagraphNav } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/AddParagraphNav'
import { ImageType } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/EditStoryForm'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  blogPageId: string
}

export type TParagraph = {
  id: string
  type: 'text' | 'video' | 'image'
  title: string
  content: string
  image?: CustomFile
  uploadedImage?: UploadedImage
  url?: string
  public_id?: string
}

export type TParagraphFields = keyof Omit<
  TParagraph,
  'id' | 'type' | 'image' | 'uploadedImage'
>

export const NewStoryForm: FC<Props> = ({ blogPageId }) => {
  // Image uploading
  const [selectedImages, setSelectedImages] = useState<CustomFile[]>([])
  const [rejectedImages, setRejectedImages] = useState<RejectedFile[]>([])
  const [uploadImagesError, setUploadImagesError] = useState('')

  const [paragraphs, setParagraphs] = useState<TParagraph[]>([])

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TStorySchema>({ resolver: zodResolver(storySchema) })

  const onSubmit = async (data: TStorySchema) => {
    // Upload story main image
    let storyMainImage: ImageType = {
      url: null,
      public_id: null,
    }

    if (selectedImages?.length > 0) {
      // TODO duplicated code
      const { timestamp, signature } = await getSignature()

      const formData = new FormData()
      formData.append('file', selectedImages[0])
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!)

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())

        storyMainImage = {
          url: response.secure_url,
          public_id: response.public_id,
        }
      } catch (err) {
        toast.error('Failed!')
        console.error('Failed to upload image to cloudinary', err)
      }
    }

    try {
      const paragraphsWithUploadedImages = await Promise.all(
        paragraphs.map(async (p) => {
          if (p.image) {
            // todo duplicated code
            const { timestamp, signature } = await getSignature()

            const formData = new FormData()
            formData.append('file', p.image)
            formData.append(
              'api_key',
              process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            )
            formData.append('signature', signature)
            formData.append('timestamp', timestamp)
            formData.append(
              'folder',
              process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!,
            )

            return new Promise((resolve) => {
              fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
                method: 'POST',
                body: formData,
              })
                .then((res) => res.json())
                .then((res) => {
                  resolve({
                    content: '',
                    title: '',
                    type: p.type,
                    url: res.secure_url,
                    public_id: res.public_id,
                  })
                })
            })
          } else {
            return new Promise((resolve) => {
              resolve({
                content: p.content,
                title: p.title,
                type: p.type,
              })
            })
          }
        }),
      )

      const response = await fetch('/api/pages/blog/stories', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          blogPageId,
          url: storyMainImage.url,
          public_id: storyMainImage.public_id,
          paragraphs: paragraphsWithUploadedImages,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        return handleStoryFieldValidation(res, setError)
      }

      toast.success(`Created!`)
      router.refresh()
      router.push(`/dashboard/entities/stories/${res.data}`)
    } catch (err) {
      toast.error('Failed')
      console.error('Failed to create story: ', err)
    }
  }

  const handleParagraphSwap = (
    direction: 'up' | 'down',
    currentPosition: number,
  ) => {
    swapParagraphs(paragraphs, setParagraphs, direction, currentPosition)
  }

  // TODO duplicated code
  const handleParagraphChange = (
    type: 'text' | 'video' | 'image',
    id: string,
    field: TParagraphFields,
    value: string | null,
    image?: CustomFile,
  ) => {
    if ((type === 'text' || type === 'video') && typeof value === 'string') {
      setParagraphs(
        [...paragraphs].map((p) => {
          if (p.id === id) {
            p[field] = value
          }
          return p
        }),
      )
    } else if (type === 'image') {
      setParagraphs(
        [...paragraphs].map((p) => {
          return p.id === id ? { ...p, image, url: undefined } : p
        }),
      )
    }
  }

  const handleParagraphDelete = (id: string) => {
    setParagraphs((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <>
      {uploadImagesError && (
        <FeedbackError
          title='Uploading images error'
          messages={[uploadImagesError]}
          onClose={() => setUploadImagesError('')}
        />
      )}
      <Heading2 value='Create story' className='mb-6' />

      <Dropzone
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        rejectedImages={rejectedImages}
        setRejectedImages={setRejectedImages}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-b space-y-6 py-10 border-borderColor'
      >
        <div className='border border-borderColor rounded-md p-4 '>
          <Paragraph value='Story main title and description' />

          <Input
            register={register}
            errors={errors}
            id='story-title'
            type='text'
            name='title'
            label='Title'
            placeholder='Story main title'
          />

          <Input
            rows={3}
            type='text'
            register={register}
            errors={errors}
            id='story-description'
            name='description'
            label='Description'
            placeholder='Short description'
          />
        </div>
        {paragraphs.length > 0 &&
          paragraphs.map((p, idx) => (
            <StoryParagraphAdmin
              onSwapPosition={handleParagraphSwap}
              onDelete={handleParagraphDelete}
              onChange={handleParagraphChange}
              key={p.id}
              paragraph={p}
              position={idx}
              lastPosition={paragraphs.length - 1}
            />
          ))}

        <AddParagraphNav setParagraphs={setParagraphs} />

        <fieldset className='space-y-4 mt-10'>
          <InputCheckbox
            register={register}
            errors={errors}
            id='productIsFeatured'
            name='isFeatured'
            label='Featured'
            description='Story will appear in About page blog section.'
          />
          <InputCheckbox
            register={register}
            errors={errors}
            id='productIsArchived'
            name='disabled'
            label='Disable'
            description='Story will not be visible for customers.'
          />
        </fieldset>
        <div className='mt-6 flex justify-end gap-x-6'>
          <CustomButton
            fill='blank'
            type='button'
            title='Cancel'
            disabled={isSubmitting}
            onClick={() => router.push('/dashboard/entities/stories')}
          />
          <CustomButton
            fill='success'
            type='submit'
            disabled={isSubmitting}
            title='Create'
          />
        </div>
      </form>
    </>
  )
}
