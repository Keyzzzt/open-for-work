'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useForm } from 'react-hook-form'
import { testimonialItemSchema, TTestimonialItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  pageId: string
}
export const NewTestimonialForm: FC<Props> = ({ pageId }) => {
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
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: JSON.stringify({ ...data, landingTestimonialsId: pageId }),
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
      router.push(`/dashboard/entities/testimonials/${res.data}`)
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to create testimonial: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='py-10'>
      <Heading2 value='Create testimonial' className='mb-6' />
      <Input
        register={register}
        errors={errors}
        id='testimonial-author'
        type='text'
        name='author'
        label='Author'
      />
      <Input
        register={register}
        errors={errors}
        id='testimonial-content'
        type='textarea'
        name='content'
        label='Feedback'
      />
      <fieldset className='space-y-4 mt-10'>
        <InputCheckbox
          register={register}
          errors={errors}
          id='testimonial-featured'
          name='featured'
          label='Featured'
          description='Testimonial will appear at the begining'
        />
        <InputCheckbox
          register={register}
          errors={errors}
          id='testimonial-disabled'
          name='disabled'
          label='Disabled'
          description='Testimonial will not be visible to customers'
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
  )
}
