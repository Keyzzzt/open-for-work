import { FC, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { aboutTimelineSchema, TTimelineSchema } from '@/schemas'
import { Input } from '@/components/Input'
import { CustomButton } from '@/components/CustomButton'
import { Heading3 } from '@/components/text/Heading3'
import { AboutTimeline } from '.prisma/client'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  isOpen: boolean
  onClose: () => void
  data: AboutTimeline
}

export const AboutTimelineUpdate: FC<Props> = ({ data, isOpen, onClose }) => {
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TTimelineSchema>({
    resolver: zodResolver(aboutTimelineSchema),
  })

  const onSubmit = async (data: TTimelineSchema) => {
    try {
      const response = await fetch(`/api/pages/about/timeline`, {
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
        // todo field validation
      }

      router.refresh()
      toast.success('Updated!')
      onClose()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update timeline section: ', err)
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
                      <Heading3 value='Timeline section' />
                    </Dialog.Title>
                    <div className='flex flex-col mt-4 p-2 rounded-md border border-borderColor bg-lightGray'>
                      <Input
                        register={register}
                        errors={errors}
                        id='about-hero-title'
                        placeholder='Section title'
                        type='text'
                        name='mainTitle'
                        rows={4}
                        label='Section title'
                        defaultValue={data.mainTitle}
                      />

                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#1' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-date-1'
                          placeholder='Date'
                          type='text'
                          rows={4}
                          name='date1'
                          defaultValue={data.date1}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-datetime-1'
                          placeholder='06-2022'
                          type='text'
                          rows={4}
                          name='dateTime1'
                          defaultValue={data.dateTime1}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-title-1'
                          placeholder='Title'
                          type='text'
                          rows={4}
                          name='title1'
                          defaultValue={data.title1}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-description-1'
                          placeholder='Description'
                          type='text'
                          rows={4}
                          name='description1'
                          defaultValue={data.description1}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-timeline-disabled1'
                            name='disabled1'
                            defaultValue={data.disabled1}
                            label='Disable item #1'
                          />
                        </div>
                      </div>
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#2' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-date-2'
                          placeholder='Date'
                          type='text'
                          rows={4}
                          name='date2'
                          defaultValue={data.date2}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-datetime-2'
                          placeholder='06-2022'
                          type='text'
                          rows={4}
                          name='dateTime2'
                          defaultValue={data.dateTime2}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-title-2'
                          placeholder='Title'
                          type='text'
                          rows={4}
                          name='title2'
                          defaultValue={data.title2}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-description-2'
                          placeholder='Description'
                          type='text'
                          rows={4}
                          name='description2'
                          defaultValue={data.description2}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-timeline-disabled2'
                            name='disabled2'
                            defaultValue={data.disabled2}
                            label='Disable item #2'
                          />
                        </div>
                      </div>
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#3' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-date-3'
                          placeholder='Date'
                          type='text'
                          rows={4}
                          name='date3'
                          defaultValue={data.date3}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-datetime-3'
                          placeholder='06-2022'
                          type='text'
                          rows={4}
                          name='dateTime3'
                          defaultValue={data.dateTime3}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-title-3'
                          placeholder='Title'
                          type='text'
                          rows={4}
                          name='title3'
                          defaultValue={data.title3}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-description-3'
                          placeholder='Description'
                          type='text'
                          rows={4}
                          name='description3'
                          label=''
                          defaultValue={data.description3}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-timeline-disabled3'
                            name='disabled3'
                            defaultValue={data.disabled3}
                            label='Disable item #3'
                          />
                        </div>
                      </div>
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#3' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-date-4'
                          placeholder='Date'
                          type='text'
                          rows={4}
                          name='date4'
                          defaultValue={data.date4}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-datetime-4'
                          placeholder='06-2022'
                          type='text'
                          rows={4}
                          name='dateTime4'
                          defaultValue={data.dateTime4}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-title-4'
                          placeholder='Title'
                          type='text'
                          rows={4}
                          name='title4'
                          defaultValue={data.title4}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-timeline-description-4'
                          placeholder='Description'
                          type='text'
                          rows={4}
                          name='description4'
                          defaultValue={data.description4}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-timeline-disabled4'
                            name='disabled4'
                            defaultValue={data.disabled4}
                            label='Disable item #4'
                          />
                        </div>
                      </div>

                      <fieldset className='space-y-4 mt-8'>
                        <InputCheckbox
                          register={register}
                          errors={errors}
                          id='about-hero-disabled'
                          name='disabled'
                          defaultValue={data.disabled}
                          label='Disable this section in About page'
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
