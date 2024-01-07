'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/Alert'
import { Select, SelectItem } from '@/components/Select'
import Image from 'next/image'
import { Dropzone } from '@/components/Dropzone'
import { FeedbackError } from '@/components/FeedbackError'
import { getSignature } from '@/helpers/imageUpload'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { productSchema, TProductSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { IconButtonHover } from '@/components/IconButtonHover'
import { CiTrash } from 'react-icons/ci'
import {
  CustomFile,
  RejectedFile,
} from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'
import {
  generateSHA1,
  generateSignature,
  handleProductFieldValidation,
} from '@/lib/utils'
import { Category } from '@/helpers/formatProductCategories'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  product: ProductType
  categories: Category[]
}

export type ProductType = {
  id: string
  title: string
  description: string
  price: number
  countInStock: number
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
  updatedAt: string
  category: Category
  images: {
    id?: string
    url: string
    public_id: string
    createdAt?: string
    productId?: string
  }[]
}
export type UploadedImage = {
  url: string
  public_id: string
}

export const EditProductForm: FC<Props> = ({ product, categories }) => {
  const [productImages, setProductImages] = useState(product.images)

  // Image uploading
  const [selectedImages, setSelectedImages] = useState<CustomFile[]>([])
  const [rejectedImages, setRejectedImages] = useState<RejectedFile[]>([])
  const [uploadImagesError, setUploadImagesError] = useState('')

  // Delete single image
  const [singleAlert, setSingleAlert] = useState(false)
  const [singleConfirmed, setSingleConfirmed] = useState(false)
  const [publicId, setPublicId] = useState('')

  // Delete product
  const [productAlert, setProductAlert] = useState(false)
  const [productConfirmed, setProductConfirmed] = useState(false)

  // Delete all images
  const [allAlert, setAllAlert] = useState(false)
  const [allConfirmed, setAllConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  // Category
  const [selectedCategory, setSelectedCategory] = useState<SelectItem>({
    id: product.category.id,
    title: product.category.title,
  })
  const selectCategories = categories.map((c) => ({ id: c.id, title: c.title }))

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TProductSchema>({ resolver: zodResolver(productSchema) })

  const onDeleteSingle = useCallback((publicId: string) => {
    setSingleAlert(true)
    setPublicId(publicId)
  }, [])

  const onSubmit = async (data: TProductSchema) => {
    // Upload images to cloudinary
    const promises = []
    let normalized: UploadedImage[] = []

    if (selectedImages.length > 0) {
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
        console.error('Error uploading product images to server: ', err)
      }
    }

    // Save images to DB
    let imagesToSave: UploadedImage[]
    if (productImages) {
      imagesToSave = [
        ...productImages.map((image) => ({
          url: image.url,
          public_id: image.public_id,
        })),
        ...normalized,
      ]
    } else {
      imagesToSave = normalized
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...data,
          categoryId: selectedCategory.id,
          images: imagesToSave,
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

      toast.success('Updated!')

      setProductImages((prev) => [...prev, ...normalized])
      setSelectedImages([])
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update product: ', err)
    }
  }

  const deleteProduct = useCallback(async () => {
    setLoading(true)
    if (productImages && productImages.length > 0) {
      // Delete all images from cloudinary
      const promises = []

      for (let i = 0; i < productImages.length; i++) {
        const timestamp = new Date().getTime().toString()
        const publicId = productImages[i].public_id

        // TODO Duplicated code
        const signature = generateSHA1(
          generateSignature(
            timestamp,
            publicId,
            process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
          ),
        )

        const loadImage = new Promise((resolve) => {
          const res = fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_DESTROY!, {
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
          resolve(res)
        })

        promises.push(loadImage)

        try {
          await Promise.all(promises)
        } catch (err) {
          toast.error('Failed')
          console.error('Error deleting images from cloudinary: ', err)
        } finally {
          setLoading(false)
        }
      }
    }

    // Delete product from DB
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return toast.error('Failed!')
      }

      toast.success('Deleted!')
      router.push('/dashboard/entities/products')
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to delete product: ', err)
    } finally {
      setLoading(false)
    }
  }, [product, router, productImages])

  const deleteSingleImage = useCallback(async () => {
    setLoading(true)
    if (productImages) {
      const timestamp = new Date().getTime().toString()
      const signature = generateSHA1(
        generateSignature(
          timestamp,
          publicId,
          process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
        ),
      )

      // Delete from Cloudinary
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

        // Delete from database
        const response = await fetch(`/api/images/${product.id}/${publicId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          return toast.error('Failed!')
        }

        // Delete from local state
        setProductImages(() =>
          productImages.filter((image) => image.public_id !== publicId),
        )
        toast.success('Deleted!')
      } catch (err) {
        toast.error('Failed!')
        console.error('Failed to delete product image: ', err)
      } finally {
        setLoading(false)
      }
    }
  }, [publicId, productImages, product.id])

  const deleteAllImages = useCallback(async () => {
    setLoading(true)

    // Delete all images from cloudinary
    if (product.images && product.images.length > 0) {
      const promises = []

      for (let i = 0; i < product.images?.length!; i++) {
        const timestamp = new Date().getTime().toString()
        const publicId = product.images[i].public_id
        const signature = generateSHA1(
          generateSignature(
            timestamp,
            publicId,
            process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
          ),
        )

        const loadImage = new Promise((resolve) => {
          const res = fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_DESTROY!, {
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
          resolve(res)
        })

        promises.push(loadImage)
      }

      try {
        await Promise.all(promises)

        // Remove all images from DB
        const response = await fetch(`/api/images/${product.id}/all`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          return toast.error('Failed')
        }

        // Remove all from state
        setProductImages([])

        toast.success('Deleted!')
      } catch (err) {
        toast.error('Failed!')
        console.error('Failed to delete product images: ', err)
      } finally {
        setLoading(false)
      }
    }
  }, [product])

  useEffect(() => {
    if (allConfirmed) {
      deleteAllImages()
      setAllConfirmed(false)
    }
  }, [allConfirmed, deleteAllImages])

  useEffect(() => {
    if (singleConfirmed) {
      deleteSingleImage()
      setSingleConfirmed(false)
    }
  }, [singleConfirmed, deleteSingleImage])

  useEffect(() => {
    if (productConfirmed) {
      deleteProduct()
      setProductConfirmed(false)
    }
  }, [productConfirmed, deleteProduct])

  return (
    <>
      {singleAlert && (
        <Alert
          type='danger'
          isOpen={singleAlert}
          onClose={setSingleAlert}
          onConfirm={setSingleConfirmed}
          titleText='Delete image'
          contentText='Are you sure you want to delete image?'
          buttonText='Delete image'
        />
      )}
      {productAlert && (
        <Alert
          type='danger'
          isOpen={productAlert}
          onClose={setProductAlert}
          onConfirm={setProductConfirmed}
          titleText='Delete product'
          contentText={`Are you sure you want to delete ${product.title}?`}
          buttonText='Delete product'
        />
      )}
      {allAlert && (
        <Alert
          type='danger'
          isOpen={allAlert}
          onClose={setAllAlert}
          onConfirm={setAllConfirmed}
          titleText='Delete all images'
          contentText={`Are you sure you want to delete all images for ${product.title}?`}
          buttonText='Delete all images'
        />
      )}

      <Heading2 value='Update product' className='mb-6' />

      <Dropzone
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        rejectedImages={rejectedImages}
        setRejectedImages={setRejectedImages}
      />

      <div className='mt-10'>
        {uploadImagesError && (
          <FeedbackError
            title='Uploading images error'
            messages={[uploadImagesError]}
            onClose={() => setUploadImagesError('')}
          />
        )}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>{`Product images (${productImages?.length})`}</h2>

          {productImages?.length ? (
            <CustomButton
              fill='danger'
              disabled={loading || isSubmitting}
              type='button'
              onClick={() => setAllAlert(true)}
              title='Delete all images'
            />
          ) : null}
        </div>
        <ul className='my-5 flex justify-center flex-wrap gap-x-4 gap-y-4'>
          {productImages?.map((image) => (
            <li key={image.url} className='relative group h-40 w-40'>
              <Image
                src={image.url}
                alt='img'
                width={100}
                height={100}
                className='h-full w-full object-contain rounded-md'
              />
              <IconButtonHover
                items={[
                  {
                    onClick: () => onDeleteSingle(image.public_id),
                    icon: <CiTrash size={28} />,
                  },
                ]}
              />
            </li>
          ))}
        </ul>
      </div>

      {/*Edit product form*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 pb-6 border-b border-borderColor'
      >
        {/*Alerts*/}
        <Input
          register={register}
          errors={errors}
          id='editProductTitle'
          type='text'
          name='title'
          label='Title'
          defaultValue={product.title}
        />
        <Input
          rows={3}
          type='textarea'
          register={register}
          errors={errors}
          id='productDescription'
          name='description'
          label='Description'
          defaultValue={product.description}
          className='resize-none'
        />
        <Input
          register={register}
          errors={errors}
          id='editProductDescription'
          type='text'
          name='description'
          label='Description'
          defaultValue={product.description}
        />

        {categories.length > 0 && (
          <div>
            <Select
              title='Category'
              values={selectCategories}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        )}

        <Input
          register={register}
          errors={errors}
          id='editProductPrice'
          type='number'
          name='price'
          label='Price'
          defaultValue={product.price}
        />

        <Input
          register={register}
          errors={errors}
          id='editProductCountInStock'
          type='number'
          name='countInStock'
          label='Count in stock'
          defaultValue={product.countInStock}
        />

        <fieldset className='space-y-4 pt-10'>
          <InputCheckbox
            register={register}
            errors={errors}
            id='editProductIsFeatured'
            name='isFeatured'
            label='Featured'
            description='Product will appear in featured list.'
            defaultValue={product.isFeatured}
          />
          <InputCheckbox
            register={register}
            errors={errors}
            id='editProductIsArchived'
            name='isArchived'
            label='Archived'
            description='Product will not be visible for customers.'
            defaultValue={product.isArchived}
          />
        </fieldset>

        <div className='mt-6 flex justify-end gap-x-6'>
          <CustomButton
            fill='blank'
            type='button'
            title='Cancel'
            disabled={loading || isSubmitting}
            onClick={() => router.push('/dashboard/entities/products')}
          />
          <CustomButton
            fill='danger'
            type='button'
            title='Delete'
            disabled={loading || isSubmitting}
            onClick={() => setProductAlert(true)}
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
