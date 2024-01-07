import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaCheck } from 'react-icons/fa6'
import { HiChevronUpDown } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

export type SelectItem = {
  id: string
  title: string
}

type Props = {
  title?: string
  values: SelectItem[]
  selectedValue?: SelectItem
  onChange: Dispatch<SetStateAction<SelectItem>>
}

export const Select: FC<Props> = ({
  title,
  values,
  onChange,
  selectedValue,
}) => {
  return (
    <Listbox value={selectedValue} onChange={onChange}>
      {({ open }) => (
        <>
          {title && <Listbox.Label>{title}</Listbox.Label>}
          <div className='relative mt-2'>
            <Listbox.Button className='relative border border-borderColor text-textColor w-full cursor-pointer rounded-md py-1.5 pl-3 pr-10 text-left'>
              <span className='block truncate'>{selectedValue?.title}</span>
              <span className='pointer-events-none absolute top-0 bottom-0 right-0 flex items-center pr-2'>
                <HiChevronUpDown
                  size={22}
                  className='text-textSecondary'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute border border-borderColor text-textColor z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg'>
                {values.map((c) => (
                  <Listbox.Option
                    key={c.id}
                    className={({ active }) =>
                      cn('relative cursor-default select-none py-2 pl-3 pr-9', {
                        'remove-tw-outline bg-lightGray': active,
                        'bg-lightGray': c.title === selectedValue?.title,
                      })
                    }
                    value={c}
                  >
                    {() => (
                      <>
                        <span
                          className={cn('block truncate cursor-pointer', {
                            'font-semibold text-success':
                              c.title === selectedValue?.title,
                          })}
                        >
                          {c.title}
                        </span>

                        <span className='absolute top-0 bottom-0 right-0 flex text-success items-center pr-4'>
                          {c.title === selectedValue?.title && (
                            <FaCheck size={22} aria-hidden='true' />
                          )}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
