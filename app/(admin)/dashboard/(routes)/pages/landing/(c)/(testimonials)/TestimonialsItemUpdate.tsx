import { FC, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialItemSchema, TTestimonialItemSchema } from '@/schemas'
import { Input } from '@/components/Input'
import { CustomButton } from '@/components/CustomButton'
import { Heading3 } from '@/components/text/Heading3'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { TestimonialItem } from '.prisma/client'

type Props = {
  isOpen: boolean
  onClose: () => void
  item: TestimonialItem | undefined
  clearItemToUpdate: () => void
}

export const TestimonialsItemUpdate: FC<Props> = ({
  item,
  isOpen,
  onClose,
  clearItemToUpdate,
}) => {
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TTestimonialItemSchema>({
    resolver: zodResolver(testimonialItemSchema),
  })

  if (!item) {
    return null
  }

  const onSubmit = async (data: TTestimonialItemSchema) => {
    try {
      const response = await fetch(
        `/api/pages/landing/testimonials/${item.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ ...data }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        //todo field validation
      }

      router.refresh()
      reset()
      clearItemToUpdate()
      toast.success('Updated!')
      onClose()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update testimonial item: ', err)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='relative mt-2 w-full'>
                    <Dialog.Title>
                      <Heading3 value='Testimonial item' />
                    </Dialog.Title>
                    <div className='flex flex-col mt-4 p-2 rounded-md border border-borderColor bg-lightGray'>
                      <Input
                        register={register}
                        errors={errors}
                        id='landing-testimonial-content'
                        placeholder='Section title'
                        type='text'
                        name='content'
                        rows={4}
                        label='Content'
                        defaultValue={item.content}
                      />{' '}
                      <Input
                        register={register}
                        errors={errors}
                        id='landing-testimonial-author'
                        placeholder='Author'
                        type='text'
                        name='author'
                        rows={4}
                        label='Author name and place'
                        defaultValue={item.author}
                      />
                      <fieldset className='space-y-4 mt-8'>
                        <InputCheckbox
                          register={register}
                          errors={errors}
                          id='landing-testimonials-disabled'
                          name='disabled'
                          defaultValue={item.disabled}
                          label='Disable this section on main page'
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className='mt-6 flex justify-end gap-x-6'>
                    <CustomButton
                      fill='blank'
                      type='button'
                      title='Cancel'
                      ref={cancelButtonRef}
                      onClick={onClose}
                    />
                    <CustomButton
                      title='Update'
                      type='submit'
                      fill='success'
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
