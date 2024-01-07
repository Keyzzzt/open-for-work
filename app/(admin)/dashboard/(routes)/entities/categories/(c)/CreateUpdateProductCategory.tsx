'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { categorySchema, TCategorySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert } from '@/components/Alert'
import { FeedbackError } from '@/components/FeedbackError'
import { Input } from '@/components/Input'
import { capitalizeFirstLetter } from '@/lib/utils'
import { CustomLink } from '@/components/CustomLink'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  action: 'create' | 'update'
  category?: {
    title: string
    description: string
  }
  categoryId?: string
}
//todo limit number of categories
export const CreateUpdateProductCategory: FC<Props> = ({
  category,
  categoryId,
  action,
}) => {
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isCategoryInUse, setIsCategoryInUse] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TCategorySchema>({ resolver: zodResolver(categorySchema) })

  const onDelete = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const res = await response.json()
        if (res.errors[0] === 'Category is in use.') {
          return setIsCategoryInUse(true)
        } else {
          return toast.error('Failed!')
        }
      }
      toast.success('Deleted!')
      router.refresh()
      router.push('/dashboard/entities/categories?mode=all')
    } catch (err) {
      toast.error('Failed!')
      console.error(`Failed to delete product category: `, err)
    } finally {
      setLoading(false)
      setDeleteConfirmed(false)
    }
  }, [categoryId, router])

  useEffect(() => {
    if (deleteConfirmed) {
      onDelete()
    }
  }, [deleteConfirmed, onDelete])

  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null

  const onSubmit = async (data: TCategorySchema) => {
    try {
      const response = await fetch(
        action === 'create'
          ? '/api/categories'
          : `/api/categories/${categoryId}`,
        {
          method: action === 'create' ? 'POST' : 'PATCH',
          body: JSON.stringify({ ...data }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        return toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        const errors = res.errors
        if (errors.title) {
          return setError('title', {
            type: 'server',
            message: errors.title,
          })
        } else if (errors.description) {
          return setError('description', {
            type: 'server',
            message: errors.description,
          })
        } else {
          return toast.error('Something went wrong!')
        }
      }

      toast.success(capitalizeFirstLetter(action + 'd'))

      if (action === 'create') {
        router.refresh()
        router.push(`/dashboard/entities/categories?mode=${res.data}`)
      }
      reset()
    } catch (err) {
      toast.error('Failed')
      console.error(`Failed to ${action} product category: `, err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-end mt-4'>
        <CustomLink
          title='Products'
          href='/dashboard/entities/products'
          className='mr-2'
        />
        <CustomLink title='Categories' href='/dashboard/entities/categories' />
        {action === 'update' && (
          <CustomLink
            title='New'
            href='/dashboard/entities/categories/create'
          />
        )}
      </div>
      <div className='space-y-12'>
        {isCategoryInUse && (
          <FeedbackError
            messages={[
              'This category is in use',
              'Please update or remove products that use this category before delete',
            ]}
            onClose={() => setIsCategoryInUse(false)}
            title='Delete category error'
          />
        )}
        {showAlert && (
          <Alert
            type='danger'
            isOpen={showAlert}
            onClose={setShowAlert}
            onConfirm={setDeleteConfirmed}
            titleText='Delete category'
            contentText={`Are you sure you want to delete the ${category?.title} category? All of
                        your data will be permanently removed from servers
                        forever. This action cannot be undone.`}
            buttonText='Delete category'
          />
        )}
        <div className='border-b border-borderColor py-10'>
          <Heading2
            value={`${capitalizeFirstLetter(action)} product category`}
            className='mb-6'
          />

          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <Input
                register={register}
                errors={errors}
                id='categoryTitle'
                type='text'
                name='title'
                label='Category title'
                defaultValue={category?.title ? category?.title : ''}
              />
            </div>
            <div className='sm:col-span-4'>
              <Input
                rows={3}
                type='textarea'
                register={register}
                errors={errors}
                id='categoryDescription'
                name='description'
                label='Category description'
                defaultValue={
                  category?.description ? category?.description : ''
                }
                className='resize-none'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex justify-end gap-x-6'>
        <CustomButton
          fill='blank'
          type='button'
          title='Cancel'
          disabled={isSubmitting}
          onClick={() => router.push('/dashboard/entities/categories?mode=all')}
        />
        {action === 'update' && (
          <CustomButton
            type='button'
            fill='danger'
            title='Delete'
            disabled={loading || isSubmitting}
            onClick={() => setShowAlert(true)}
          />
        )}
        <CustomButton
          type='submit'
          fill='success'
          disabled={loading || isSubmitting}
          title={capitalizeFirstLetter(action)}
        />
      </div>
    </form>
  )
}
