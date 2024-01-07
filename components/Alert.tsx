import { FC, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@/components/ExclamationIcon'
import { CustomButton } from '@/components/CustomButton'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  type: 'success' | 'warning' | 'danger'
  isOpen: boolean
  titleText: string
  buttonText: string
  contentText: string
  onClose: (value: boolean) => void
  onConfirm: (value: boolean) => void
}

export const Alert: FC<Props> = ({
  titleText,
  contentText,
  buttonText,
  isOpen,
  onClose,
  onConfirm,
  type,
}) => {
  const cancelButtonRef = useRef(null)

  const handleSubmit = () => {
    onConfirm(true)
    onClose(false)
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
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
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
                <div className='sm:flex sm:items-start'>
                  <ExclamationIcon type={type} />
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <Dialog.Title>
                      <Heading3 value={titleText} />
                    </Dialog.Title>
                    <Paragraph className='mt-2' value={contentText} />
                  </div>
                </div>
                <div className='mt-6 flex justify-end gap-x-6'>
                  <CustomButton
                    fill='blank'
                    type='button'
                    title='Cancel'
                    ref={cancelButtonRef}
                    onClick={() => onClose(false)}
                  />
                  <CustomButton
                    fill='success'
                    title={buttonText}
                    type='button'
                    onClick={handleSubmit}
                    className='border-danger hover:bg-dangerHover active:bg-dangerActive hover:border-dangerHover active:border-dangerActive active:text-white'
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
