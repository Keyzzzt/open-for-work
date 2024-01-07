'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { testimonialItemSchema, TTestimonialItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { TestimonialItem } from '.prisma/client'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { Alert } from '@/components/Alert'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  testimonial: TestimonialItem
}
export const EditTestimonialForm: FC<Props> = ({ testimonial }) => {
  const [testimonialAlert, setTestimonialAlert] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TTestimonialItemSchema>({
    resolver: zodResolver(testimonialItemSchema),
  })

  const onSubmit = async (data: TTestimonialItemSchema) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...data }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        // Todo field validation
      }

      toast.success(`Updated!`)
      router.refresh()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update testimonial: ', err)
    }
  }

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return toast.error('Failed!')
      }

      toast.success('Deleted')
      router.refresh()
      router.push('/dashboard/entities/testimonials')
    } catch (err) {
      toast.error('Failed')
      console.error('Failed to delete testimonial: ', err)
    } finally {
      setLoading(false)
    }
  }, [testimonial.id, router])

  useEffect(() => {
    if (confirmed) {
      handleDelete()
      setConfirmed(false)
    }
  }, [confirmed, handleDelete])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='py-10'>
      <Heading2 value='Update testimonial' className='mb-6' />
      {testimonialAlert && (
        <Alert
          type='danger'
          isOpen={testimonialAlert}
          onClose={setTestimonialAlert}
          onConfirm={setConfirmed}
          titleText='Delete testimonial'
          contentText='Are you sure you want to delete?'
          buttonText='Delete'
        />
      )}
      <Input
        register={register}
        errors={errors}
        id='testimonial-author'
        type='text'
        name='author'
        label='Author'
        defaultValue={testimonial.author}
      />{' '}
      <Input
        register={register}
        errors={errors}
        id='testimonial-content'
        type='textarea'
        name='content'
        label='Feedback'
        defaultValue={testimonial.content}
      />
      <fieldset className='space-y-4 mt-10'>
        <InputCheckbox
          register={register}
          errors={errors}
          id='testimonial-featured'
          name='featured'
          label='Featured'
          description='Testimonial will appear at the begining of list'
          defaultValue={testimonial.featured}
        />
        <InputCheckbox
          register={register}
          errors={errors}
          id='testimonial-disabled'
          name='disabled'
          label='Disabled'
          description='Testimonial will not be visible to customers'
          defaultValue={testimonial.disabled}
        />
      </fieldset>
      <div className='mt-6 flex justify-end gap-x-6'>
        <CustomButton
          fill='blank'
          type='button'
          title='Cancel'
          disabled={isSubmitting}
          onClick={() => router.push('/dashboard/entities/testimonials')}
        />
        <CustomButton
          fill='danger'
          type='button'
          title='Delete'
          disabled={loading || isSubmitting}
          onClick={() => setTestimonialAlert(true)}
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
