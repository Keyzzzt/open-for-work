'use client'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select } from '@/components/Select'
import { Heading1 } from '@/components/text/Heading1'
import { Paragraph } from '@/components/text/Paragraph'
import { EmptyState } from '@/components/EmptyState'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { FaqPageUpdate } from '@/app/(admin)/dashboard/(routes)/pages/faq/FaqPageUpdate'
import { FaqPage } from '.prisma/client'
import { Disclosure } from '@headlessui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type FaqCategory = {
  id: string
  title: string
}
type Faq = {
  id: string
  question: string
  answer: string
  category: FaqCategory
}

type Props = {
  faqPage: FaqPage
  faqItems: Faq[]
  categories: FaqCategory[]
}
export const FaqPageAdmin: FC<Props> = ({ faqPage, faqItems, categories }) => {
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (currentCategory.title === 'All') {
      router.push(`/dashboard/pages/faq`)
    } else {
      router.push(`/dashboard/pages/faq?category=${currentCategory.title}`)
    }
  }, [currentCategory, router])

  return (
    <div className='mb-10'>
      <FaqPageUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        faq={faqPage}
      />
      <EditSectionNav
        disabled={faqPage.disabled}
        onClick={() => setIsOpen(true)}
      />
      <div className='min-h-[100vh]'>
        <div className='mx-auto max-w-3xl text-center'>
          <Heading1 value={faqPage.title} />
          <Paragraph value={faqPage.description} className='mt-4' />
        </div>
        <>
          <div className='flex justify-end mt-10'>
            <div className='w-[200px]'>
              <Select
                values={categories}
                selectedValue={currentCategory}
                onChange={setCurrentCategory}
              />
            </div>
          </div>
          {faqItems.length === 0 ? (
            <EmptyState
              className='mt-10'
              title='Oops, there is nothing here...'
            />
          ) : (
            <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
              <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
                {faqItems.map((faq) => (
                  <Disclosure as='div' key={faq.question} className='pt-6'>
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                            <Paragraph
                              value={faq.question}
                              className='leading-7'
                            />
                            <span className='ml-6 flex h-7 items-center'>
                              {open ? (
                                <AiOutlineMinus
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              ) : (
                                <AiOutlinePlus
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                          <p className='text-base'>{faq.answer}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          )}
        </>
      </div>
    </div>
  )
}
