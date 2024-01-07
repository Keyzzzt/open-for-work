'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Alert } from '@/components/Alert'
import Image from 'next/image'
import { Dropzone } from '@/components/Dropzone'

import { FeedbackError } from '@/components/FeedbackError'
import { getSignature } from '@/helpers/imageUpload'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { storySchema, TStorySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { IconButtonHover } from '@/components/IconButtonHover'
import { CiTrash } from 'react-icons/ci'
import {
  CustomFile,
  RejectedFile,
} from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'
import { BlogItem } from '.prisma/client'
import { Paragraph } from '@/components/text/Paragraph'
import {
  generateSHA1,
  generateSignature,
  handleStoryFieldValidation,
  swapParagraphs,
} from '@/lib/utils'
import {
  TParagraph,
  TParagraphFields,
} from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/NewStoryForm'
import { StoryParagraphAdmin } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/StoryParagraphAdmin'
import { AddParagraphNav } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/AddParagraphNav'
import { useRouter } from 'next/navigation'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  story: BlogItem & { paragraphs: any[] }
}

export type ImageType = {
  url: string | null
  public_id: string | null
}

export const EditStoryForm: FC<Props> = ({ story }) => {
  const [storyImage, setStoryImage] = useState<ImageType | undefined>({
    url: story.url,
    public_id: story.public_id,
  })
  const [paragraphs, setParagraphs] = useState<Array<TParagraph>>(
    story.paragraphs,
  )

  // Image uploading
  const [selectedImages, setSelectedImages] = useState<CustomFile[]>([])
  const [rejectedImages, setRejectedImages] = useState<RejectedFile[]>([])
  const [uploadImagesError, setUploadImagesError] = useState('')

  // Delete main image
  const [singleAlert, setSingleAlert] = useState(false)
  const [singleConfirmed, setSingleConfirmed] = useState(false)
  const [publicId, setPublicId] = useState('')

  // Delete paragraph image
  const [paragraphImageAlert, setParagraphImageAlert] = useState(false)
  const [paragraphImageConfirmed, setParagraphImageConfirmed] = useState(false)
  const [paragraphImagePublic_id, setParagraphImagePublic_id] = useState('')
  const [paragraphId, setParagraphId] = useState('')

  // Delete story
  const [storyAlert, setStoryAlert] = useState(false)
  const [storyConfirmed, setStoryConfirmed] = useState(false)

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TStorySchema>({ resolver: zodResolver(storySchema) })

  const onStoryImageDelete = useCallback((publicId: string) => {
    setSingleAlert(true)
    setPublicId(publicId)
  }, [])

  const onParagraphImageDelete = useCallback(
    (publicId: string, paragraphId: string) => {
      setParagraphId(paragraphId)
      setParagraphImageAlert(true)
      setParagraphImagePublic_id(publicId)
    },
    [],
  )

  const handleParagraphSwap = (
    direction: 'up' | 'down',
    currentPosition: number,
  ) => {
    swapParagraphs(paragraphs, setParagraphs, direction, currentPosition)
  }

  const onSubmit = async (data: TStorySchema) => {
    // Upload images
    let storyMainImage: ImageType = {
      url: null,
      public_id: null,
    }

    if (selectedImages?.length > 0) {
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
      } catch (error) {
        console.error('Error: ', error)
      }
    }

    const paragraphsWithUploadedImages = await Promise.all(
      paragraphs.map(async (p) => {
        try {
          if (p.image) {
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
                url: p.url ? p.url : null,
                public_id: p.public_id ? p.public_id : null,
              })
            })
          }
        } catch (err) {
          console.error(err)
        }
      }),
    )

    try {
      const payload = storyMainImage.url
        ? {
            ...data,
            url: storyMainImage.url,
            public_id: storyMainImage.public_id,
            paragraphs: paragraphsWithUploadedImages,
          }
        : {
            ...data,
            paragraphs: paragraphsWithUploadedImages,
          }

      const response = await fetch(`/api/pages/blog/stories/${story.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
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

      if (selectedImages?.length > 0) {
        setStoryImage({
          url: storyMainImage.url,
          public_id: storyMainImage.public_id,
        })
        setSelectedImages([])
      }

      toast.success('Updated!')
      router.refresh()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update story: ', err)
    }
  }

  const deleteStory = useCallback(async () => {
    setLoading(true)
    if (storyImage && storyImage.url && storyImage.public_id) {
      // Delete story image from cloudinary
      const timestamp = new Date().getTime().toString()
      const publicId = storyImage.public_id
      const signature = generateSHA1(
        generateSignature(
          timestamp,
          publicId,
          process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
        ),
      )

      try {
        await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_DESTROY!, {
          method: 'POST',
          body: JSON.stringify({
            public_id: publicId,
            signature: signature,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            timestamp: timestamp,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (err) {
        toast.error('Failed')
        console.error('Error: ', err)
      }
    }

    try {
      // Delete story and images from db
      const dbResponse = await fetch(
        `/dashboard/entities/stories/${story.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!dbResponse.ok) {
        return toast.error('Failed!')
      }

      toast.success('Deleted')
    } catch (err) {
      toast.error('Failed')
      console.error('Error: ', err)
    } finally {
      setLoading(false)
    }
  }, [story, storyImage])

  const deleteStoryImage = useCallback(async () => {
    setLoading(true)
    if (storyImage) {
      const timestamp = new Date().getTime().toString()
      const signature = generateSHA1(
        generateSignature(
          timestamp,
          publicId,
          process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
        ),
      )

      try {
        // Delete from Cloudinary
        await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_DESTROY!, {
          method: 'POST',
          body: JSON.stringify({
            public_id: publicId,
            signature: signature,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            timestamp: timestamp,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // Delete from database
        const response = await fetch(`/api/pages/blog/stories/${story.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: story.title,
            description: story.description,
            disabled: story.disabled,
            isFeatured: story.isFeatured,
            url: null,
            public_id: null,
            paragraphs,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          return toast.error('Failed!')
        }

        // Delete from local state
        setStoryImage(undefined)
        toast.success('Deleted!')
      } catch (err) {
        toast.error('Failed!')
        console.error('Failed to delete story image: ', err)
      } finally {
        setLoading(false)
      }
    }
  }, [
    publicId,
    storyImage,
    story.id,
    paragraphs,
    story.description,
    story.title,
    story.disabled,
    story.isFeatured,
  ])

  const deleteParagraphImage = useCallback(async () => {
    setLoading(true)
    const timestamp = new Date().getTime().toString()
    const signature = generateSHA1(
      generateSignature(
        timestamp,
        paragraphImagePublic_id,
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
      ),
    )

    try {
      // Delete from Cloudinary
      await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_DESTROY!, {
        method: 'POST',
        body: JSON.stringify({
          public_id: paragraphImagePublic_id,
          signature: signature,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
          timestamp: timestamp,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Delete from database
      const response = await fetch(`/api/paragraph/${paragraphId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          type: 'image',
          url: null,
          public_id: null,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return toast.error('Failed!')
      }

      // Delete from local state
      setParagraphs(
        [...paragraphs].map((p) => {
          return p.id === paragraphId
            ? { ...p, url: undefined, public_id: undefined }
            : p
        }),
      )
      toast.success('Deleted!')
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to delete story image: ', err)
    } finally {
      setLoading(false)
    }
  }, [paragraphId, paragraphImagePublic_id, paragraphs])

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

  useEffect(() => {
    if (singleConfirmed) {
      deleteStoryImage()
      setSingleConfirmed(false)
    }
  }, [singleConfirmed, deleteStoryImage])

  useEffect(() => {
    if (paragraphImageConfirmed) {
      deleteParagraphImage()
      setParagraphImageConfirmed(false)
    }
  }, [deleteParagraphImage, paragraphImageConfirmed])

  useEffect(() => {
    if (storyConfirmed) {
      deleteStory()
      setStoryConfirmed(false)
    }
  }, [storyConfirmed, deleteStory])

  return (
    <>
      {singleAlert && (
        <Alert
          type='danger'
          isOpen={singleAlert}
          onClose={setSingleAlert}
          onConfirm={setSingleConfirmed}
          titleText='Delete image'
          contentText='Are you sure you want to delete story image?'
          buttonText='Delete image'
        />
      )}
      {paragraphImageAlert && (
        <Alert
          type='danger'
          isOpen={paragraphImageAlert}
          onClose={setParagraphImageAlert}
          onConfirm={setParagraphImageConfirmed}
          titleText='Delete image'
          contentText='Are you sure you want to delete paragraph image?'
          buttonText='Delete image'
        />
      )}
      {storyAlert && (
        <Alert
          type='danger'
          isOpen={storyAlert}
          onClose={setStoryAlert}
          onConfirm={setStoryConfirmed}
          titleText='Delete story'
          contentText={`Are you sure you want to delete "${story.title}?"`}
          buttonText='Delete story'
        />
      )}

      <Heading2 value='Update story' className='mb-6' />

      {!storyImage?.url && (
        <Dropzone
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          rejectedImages={rejectedImages}
          setRejectedImages={setRejectedImages}
        />
      )}

      <div className='mt-10'>
        {uploadImagesError && (
          <FeedbackError
            title='Uploading images error'
            messages={[uploadImagesError]}
            onClose={() => setUploadImagesError('')}
          />
        )}

        {storyImage && storyImage.url && storyImage.public_id ? (
          <ul className='my-5 flex justify-center flex-wrap gap-x-4 gap-y-4'>
            <li key={storyImage.url} className='relative group w-full'>
              <Image
                className='mx-auto aspect-video rounded-xl bg-gray-50 object-cover w-full h-80'
                src={storyImage.url}
                alt='story image'
                width={1000}
                height={300}
              />
              <IconButtonHover
                items={[
                  {
                    onClick: () => onStoryImageDelete(storyImage.public_id!),
                    icon: <CiTrash size={28} />,
                  },
                ]}
              />
            </li>
          </ul>
        ) : (
          <div className='flex items-center justify-center'>
            <Paragraph fontLarge value='Story has no image' />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 py-10 border-b border-borderColor'
      >
        <div className='border border-borderColor rounded-md p-4 '>
          <Paragraph value='Story main title and description' />
          <Input
            register={register}
            errors={errors}
            id='edit-story-title'
            type='text'
            name='title'
            label='Title'
            defaultValue={story.title}
          />

          <Input
            register={register}
            errors={errors}
            id='edit-story-description'
            rows={3}
            type='text'
            name='description'
            label='Thumbnail description'
            defaultValue={story.description}
          />
        </div>
        {paragraphs.length > 0 &&
          paragraphs.map((p, idx) => (
            <StoryParagraphAdmin
              onSwapPosition={handleParagraphSwap}
              onParagraphImageDelete={onParagraphImageDelete}
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
            id='edit-story-isFeatured'
            name='isFeatured'
            label='Featured'
            defaultValue={story.isFeatured}
            description='Story will appear in About page blog section.'
          />
          <InputCheckbox
            register={register}
            errors={errors}
            id='edit-story-disabled'
            name='disabled'
            label='Disable'
            defaultValue={story.disabled}
            description='Story will not be visible for customers.'
          />
        </fieldset>

        <div className='mt-6 flex justify-end gap-x-6'>
          <CustomButton
            fill='blank'
            type='button'
            title='Cancel'
            disabled={loading || isSubmitting}
            onClick={() => router.push('/dashboard/entities/stories')}
          />
          <CustomButton
            fill='danger'
            type='button'
            title='Delete'
            disabled={loading || isSubmitting}
            onClick={() => setStoryAlert(true)}
          />
          <CustomButton
            type='submit'
            fill='success'
            title='Update'
            disabled={loading || isSubmitting}
          />
        </div>
      </form>
    </>
  )
}
