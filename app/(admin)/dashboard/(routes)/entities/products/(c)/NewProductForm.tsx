'use client'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectItem } from '@/components/Select'
import { toast } from 'react-hot-toast'
import { Dropzone } from '@/components/Dropzone'
import { FeedbackError } from '@/components/FeedbackError'
import { getSignature } from '@/helpers/imageUpload'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { productSchema, TProductSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { UploadedImage } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'
import { handleProductFieldValidation } from '@/lib/utils'
import { Category } from '@/helpers/formatProductCategories'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  categories: Category[]
}

export type CustomFile = File & { preview: string }
export type RejectedFile = {
  errors: {
    code: string
    message: string
  }[]
  file: File
}
export const NewProductForm: FC<Props> = ({ categories }) => {
  // Image uploading
  const [selectedImages, setSelectedImages] = useState<CustomFile[]>([])
  const [rejectedImages, setRejectedImages] = useState<RejectedFile[]>([])
  const [uploadImagesError, setUploadImagesError] = useState('')

  // Category
  const [selectedCategory, setSelectedCategory] = useState<SelectItem>({
    id: categories[0].id,
    title: categories[0].title,
  })
  const selectCategories = categories.map((c) => ({ id: c.id, title: c.title }))

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TProductSchema>({ resolver: zodResolver(productSchema) })

  if (categories.length === 0) {
    return <div>Please add categories</div>
  }

  const onSubmit = async (data: TProductSchema) => {
    // Upload images
    const promises = []
    let normalized: UploadedImage[] = []
    if (selectedImages?.length > 0) {
      const { timestamp, signature } = await getSignature()

      for (let i = 0; i < selectedImages.length; i++) {
        const formData = new FormData()
        formData.append('file', selectedImages[i])
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
        formData.append('signature', signature)
        formData.append('timestamp', timestamp)
        formData.append(
          'folder',
          process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!,
        )

        const loadImage = new Promise((resolve) => {
          const res = fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
            method: 'POST',
            body: formData,
          }).then((res) => res.json())
          resolve(res)
        })

        promises.push(loadImage)
      }
      try {
        const res = await Promise.all(promises)
        normalized = res.map((item: any) => ({
          url: item.secure_url,
          public_id: item.public_id,
        }))
      } catch (err) {
        toast.error('Failed!')
        console.error('Failed to upload images to cloudinary: ', err)
      }
    }

    // Save to database
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          images: normalized,
          categoryId: selectedCategory.id,
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
        return handleProductFieldValidation(res, setError)
      }

      toast.success('Created!')
      router.push(`/dashboard/entities/products/${res.data}`)
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to create product: ', err)
    }
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
      <Heading2 value='Create product' className='mb-6' />

      <Dropzone
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        rejectedImages={rejectedImages}
        setRejectedImages={setRejectedImages}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-b space-y-6 pb-6 border-borderColor'
      >
        <Input
          register={register}
          errors={errors}
          id='productTitle'
          type='text'
          name='title'
          label='Title'
        />

        <Input
          rows={3}
          type='textarea'
          register={register}
          errors={errors}
          id='productDescription'
          name='description'
          label='Description'
          className='resize-none'
        />
        <div>
          {categories.length > 0 && (
            <Select
              title='Category'
              values={selectCategories}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          )}
        </div>
        <Input
          register={register}
          errors={errors}
          id='productPrice'
          type='number'
          name='price'
          label='Price'
        />
        <Input
          register={register}
          errors={errors}
          id='productCountInStock'
          type='number'
          name='countInStock'
          label='Count in stock'
        />

        <fieldset className='space-y-4 pt-10'>
          <InputCheckbox
            register={register}
            errors={errors}
            id='productIsFeatured'
            name='isFeatured'
            label='Featured'
            description='Product will appear in featured list.'
          />
          <InputCheckbox
            register={register}
            errors={errors}
            id='productIsArchived'
            name='isArchived'
            label='Archived'
            description='Product will not be visible for customers.'
          />
        </fieldset>
        <div className='mt-6 flex justify-end gap-x-6'>
          <CustomButton
            fill='blank'
            type='button'
            title='Cancel'
            disabled={isSubmitting}
            onClick={() => router.push('/dashboard/entities/products')}
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
