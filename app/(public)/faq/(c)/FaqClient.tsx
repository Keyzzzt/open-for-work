'use client'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select } from '@/components/Select'
import Section from '@/components/Section'
import { Heading1 } from '@/components/text/Heading1'
import { Paragraph } from '@/components/text/Paragraph'
import { EmptyState } from '@/components/EmptyState'
import { FaqItem } from '.prisma/client'
import { Disclosure } from '@headlessui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = {
  categories: { id: string; title: string }[]
  faqItems: FaqItem[]
  pageTitle: string
  pageDescription: string
}
export const FaqClient: FC<Props> = ({
  faqItems,
  categories,
  pageDescription,
  pageTitle,
}) => {
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const router = useRouter()

  useEffect(() => {
    if (currentCategory.title === 'All') {
      router.push(`/faq`)
    } else {
      router.push(`/faq?category=${currentCategory.title}`)
    }
  }, [currentCategory, router])

  return (
    <Section className='min-h-[100vh]'>
      <div className='mx-auto max-w-3xl text-center'>
        <Heading1 value={pageTitle} />
        <Paragraph value={pageDescription} className='mt-4' />
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
    </Section>
  )
}
