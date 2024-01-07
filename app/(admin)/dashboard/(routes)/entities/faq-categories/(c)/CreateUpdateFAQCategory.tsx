'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { faqCategorySchema, TFAQCategorySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert } from '@/components/Alert'
import { FeedbackError } from '@/components/FeedbackError'
import { Input } from '@/components/Input'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  action: 'create' | 'update'
  category?: {
    title: string
  }
  categoryId?: string
}

export const CreateUpdateFAQCategory: FC<Props> = ({
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
  } = useForm<TFAQCategorySchema>({ resolver: zodResolver(faqCategorySchema) })

  const onDelete = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/faq-categories/${categoryId}`, {
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
      router.push('/dashboard/entities/faq-categories?mode=all')
    } catch (err) {
      toast.error('Something went wrong')
      console.error(`Failed to delete FAQ category: `, err)
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

  const onSubmit = async (data: TFAQCategorySchema) => {
    const URL =
      action === 'create'
        ? '/api/faq-categories'
        : `/api/faq-categories/${categoryId}`
    try {
      const response = await fetch(URL, {
        method: action === 'create' ? 'POST' : 'PATCH',
        body: JSON.stringify({
          title: data.title,
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
        const errors = res.errors
        if (errors.title) {
          return setError('title', {
            type: 'server',
            message: errors.title,
          })
        } else {
          return toast.error('Something went wrong!')
        }
      }

      toast.success(capitalizeFirstLetter(action) + 'd!')
      router.refresh()
      if (action === 'create') {
        router.push(`/dashboard/entities/faq-categories/${res.data}`)
      }
    } catch (error) {
      toast.error('Failed!')
      console.error(`Failed to ${action} FAQ category`, error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12'>
        {isCategoryInUse && (
          <FeedbackError
            messages={[
              'This category is in use',
              'Please update or remove FAQ items that use this category before delete',
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
            contentText={`Delete ${category?.title} category?`}
            buttonText='Delete category'
          />
        )}
        <div className='border-b border-borderColor py-10'>
          <Heading2
            value={`${capitalizeFirstLetter(action)} FAQ category`}
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
          </div>
        </div>
      </div>

      <div className='mt-6 flex justify-end gap-x-6'>
        <CustomButton
          fill='blank'
          type='button'
          title='Cancel'
          disabled={isSubmitting}
          onClick={() => router.push('/dashboard/entities/faq-categories')}
        />
        {action === 'update' && (
          <CustomButton
            type='button'
            fill='danger'
            title='Delete'
            disabled={loading}
            onClick={() => setShowAlert(true)}
          />
        )}
        <CustomButton
          type='submit'
          fill='success'
          disabled={isSubmitting}
          title={action === 'create' ? 'Create' : 'Update'}
        />
      </div>
    </form>
  )
}
