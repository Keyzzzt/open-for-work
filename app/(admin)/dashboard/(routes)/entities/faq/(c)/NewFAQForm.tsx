'use client'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { faqItemSchema, TFaqItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { FaqCategory } from '.prisma/client'
import { Select, SelectItem } from '@/components/Select'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  categories: FaqCategory[]
  faqPageId: string
}
export const NewFAQForm: FC<Props> = ({ categories, faqPageId }) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectItem>({
    id: categories[0].id,
    title: categories[0].title,
  })

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
      const response = await fetch('/api/faq', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          categoryId: selectedCategory.id,
          faqPageId,
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
        // todo field validation
      }

      toast.success(`Created!`)
      router.refresh()
      router.push(`/dashboard/entities/faq/${res.data}`)
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to create new FAQ: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='py-10'>
      <Heading2 value='Create FAQ' className='mb-6' />
      <Input
        register={register}
        errors={errors}
        id='faq-question'
        type='text'
        name='question'
        label='Question'
        placeholder='Question'
      />

      <Input
        register={register}
        errors={errors}
        id='faq-answer'
        type='text'
        name='answer'
        label='Answer'
        placeholder='Answer'
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
          fill='success'
          type='submit'
          disabled={isSubmitting}
          title='Create'
        />
      </div>
    </form>
  )
}
