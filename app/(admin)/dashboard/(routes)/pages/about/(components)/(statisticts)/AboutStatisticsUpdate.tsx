import { FC, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { aboutStatisticsSchema, TAboutStatisticsSchema } from '@/schemas'
import { Input } from '@/components/Input'
import { CustomButton } from '@/components/CustomButton'
import { Heading3 } from '@/components/text/Heading3'
import { InputCheckbox } from '@/components/client/InputCheckbox'
import { Paragraph } from '@/components/text/Paragraph'
import { AboutStatistics } from '.prisma/client'

type Props = {
  isOpen: boolean
  onClose: () => void
  data: AboutStatistics
}

export const AboutStatisticsUpdate: FC<Props> = ({ data, isOpen, onClose }) => {
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAboutStatisticsSchema>({
    resolver: zodResolver(aboutStatisticsSchema),
  })

  const onSubmit = async (data: TAboutStatisticsSchema) => {
    try {
      const response = await fetch(`/api/pages/about/statistics`, {
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
      console.error('Failed to update statistics section: ', err)
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
                      <Heading3 value='Vacancies section' />
                    </Dialog.Title>
                    <div className='flex flex-col mt-4 p-2 rounded-md border border-borderColor bg-lightGray'>
                      <Input
                        register={register}
                        errors={errors}
                        id='about-statistics-title'
                        placeholder='Section title'
                        type='text'
                        name='title'
                        rows={4}
                        label='Section title'
                        defaultValue={data.title}
                      />
                      <Input
                        register={register}
                        errors={errors}
                        id='about-statistics-description'
                        placeholder='Section description'
                        type='textarea'
                        name='description'
                        rows={4}
                        label='Section title'
                        defaultValue={data.description}
                      />
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#1' />

                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-result-1'
                          placeholder='Column result'
                          type='textarea'
                          rows={4}
                          name='result1'
                          label=''
                          defaultValue={data.result1}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-title-1'
                          placeholder='Column title'
                          type='text'
                          rows={4}
                          name='title1'
                          label=''
                          defaultValue={data.title1}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-description-1'
                          placeholder='Place'
                          type='text'
                          rows={4}
                          name='description1'
                          label=''
                          defaultValue={data.description1}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-statistics-disabled1'
                            name='disabled1'
                            defaultValue={data.disabled1}
                            label='Disable column #1'
                          />
                        </div>
                      </div>
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#2' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-result-2'
                          placeholder='Column result'
                          type='textarea'
                          rows={4}
                          name='result2'
                          label=''
                          defaultValue={data.result2}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-title-2'
                          placeholder='Column title'
                          type='text'
                          rows={4}
                          name='title2'
                          label=''
                          defaultValue={data.title2}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-description-2'
                          placeholder='Place'
                          type='text'
                          rows={4}
                          name='description2'
                          label=''
                          defaultValue={data.description2}
                        />
                        <div className='mt-4'>
                          <InputCheckbox
                            register={register}
                            errors={errors}
                            id='about-statistics-disabled2'
                            name='disabled2'
                            defaultValue={data.disabled2}
                            label='Disable column #2'
                          />
                        </div>
                      </div>
                      <div className='border border-borderColor p-2 rounded-md mt-4'>
                        <Paragraph value='#3' />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-result-3'
                          placeholder='Column result'
                          type='textarea'
                          rows={4}
                          name='result3'
                          label=''
                          defaultValue={data.result3}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-title-3'
                          placeholder='Column title'
                          type='text'
                          rows={4}
                          name='title3'
                          label=''
                          defaultValue={data.title3}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id='about-statistics-description-3'
                          placeholder='Place'
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
                            id='about-statistics-disabled3'
                            name='disabled3'
                            defaultValue={data.disabled3}
                            label='Disable column #3'
                          />
                        </div>
                      </div>
                      <fieldset className='space-y-4 mt-8'>
                        <InputCheckbox
                          register={register}
                          errors={errors}
                          id='about-vacancy-disabled'
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
