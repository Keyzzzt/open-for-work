'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { faqItemSchema, TFaqItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { FaqItem, FaqCategory } from '.prisma/client'
import { Select, SelectItem } from '@/components/Select'
import { Alert } from '@/components/Alert'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  categories: FaqCategory[]
  faq: FaqItem & { category: FaqCategory }
}

export const EditFAQForm: FC<Props> = ({ categories, faq }) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectItem>({
    id: faq.category.id,
    title: faq.category.title,
  })
  const [faqAlert, setFaqAlert] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const faqCategories = categories.map((c) => ({ id: c.id, title: c.title }))

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TFaqItemSchema>({ resolver: zodResolver(faqItemSchema) })

  const onSubmit = async (data: TFaqItemSchema) => {
    try {
      const response = await fetch(`/api/faq/${faq.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...data, categoryId: selectedCategory.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        // todo field validation
      }

      toast.success(`Updated!`)
    } catch (err) {
      toast.error('Failed')
      console.error('Failed to update FAQ item: ', err)
    }
  }

  const handleDelete = useCallback(async () => {
    setLoading(true)

    try {
      // Delete story and images from db
      await fetch(`/api/faq/${faq.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.success('Deleted')
      router.refresh()
      router.push('/dashboard/entities/faq')
    } catch (err) {
      toast.error('Failed')
      console.error('Error: ', err)
    } finally {
      setLoading(false)
    }
  }, [faq.id, router])

  useEffect(() => {
    if (confirmed) {
      handleDelete()
      setConfirmed(false)
    }
  }, [confirmed, handleDelete])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='py-10'>
      <Heading2 value='Update FAQ' className='mb-6' />
      {faqAlert && (
        <Alert
          type='danger'
          isOpen={faqAlert}
          onClose={setFaqAlert}
          onConfirm={setConfirmed}
          titleText='Delete FAQ'
          contentText='Are you sure you want to delete?'
          buttonText='Delete'
        />
      )}
      <Input
        register={register}
        errors={errors}
        id='faq-question'
        type='text'
        name='question'
        label='Question'
        placeholder='Question'
        defaultValue={faq.question}
      />

      <Input
        register={register}
        errors={errors}
        id='faq-answer'
        type='text'
        name='answer'
        label='Answer'
        placeholder='Answer'
        defaultValue={faq.answer}
      />

      <div className='mt-4'>
        {categories.length > 0 && (
          <Select
            title='Category'
            values={faqCategories}
            selectedValue={selectedCategory}
            onChange={setSelectedCategory}
          />
        )}
      </div>

      <div className='mt-6 flex justify-end gap-x-6'>
        <CustomButton
          fill='blank'
          type='button'
          title='Cancel'
          disabled={isSubmitting}
          onClick={() => router.push('/dashboard/entities/faq')}
        />
        <CustomButton
          fill='danger'
          type='button'
          title='Delete'
          disabled={loading || isSubmitting}
          onClick={() => setFaqAlert(true)}
        />
        <CustomButton
          fill='success'
          type='submit'
          disabled={loading || isSubmitting}
          title='Update'
        />
      </div>
    </form>
  )
}
