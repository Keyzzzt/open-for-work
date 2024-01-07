'use client'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { LandingTestimonials, TestimonialItem } from '.prisma/client'
import { FC, useCallback, useEffect, useState } from 'react'
import { EditSectionNav } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EditSectionNav'
import { TestimonialsUpdate } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(testimonials)/TestimonialsUpdate'
import { IconButtonHover } from '@/components/IconButtonHover'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { Alert } from '@/components/Alert'
import toast from 'react-hot-toast'
import { TestimonialsItemUpdate } from '@/app/(admin)/dashboard/(routes)/pages/landing/(c)/(testimonials)/TestimonialsItemUpdate'

type Props = {
  section: LandingTestimonials
  items: TestimonialItem[]
}

export const LandingTestimonialsAdmin: FC<Props> = ({ section, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Delete item
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [itemId, setItemId] = useState('')
  const [itemToUpdate, setItemToUpdate] = useState<
    TestimonialItem | undefined
  >()

  const onDelete = useCallback((id: string) => {
    setDeleteAlert(true)
    setItemId(id)
  }, [])

  const handleItemDelete = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch(
        `/api/pages/landing/testimonials/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        return toast.error('Failed to delete')
      }

      toast.success('Deleted')
    } catch (err) {
      toast.error('Failed to delete')
    } finally {
      setLoading(false)
    }
  }, [itemId])

  useEffect(() => {
    if (confirmed) {
      handleItemDelete()
      setConfirmed(false)
    }
  }, [handleItemDelete, setConfirmed, confirmed])

  return (
    <div aria-labelledby='testimonial-heading' className='relative'>
      {deleteAlert && (
        <Alert
          type='danger'
          isOpen={deleteAlert}
          onClose={setDeleteAlert}
          onConfirm={setConfirmed}
          titleText='Delete testimonial item'
          contentText='Are you sure you want to delete this item?'
          buttonText='Delete'
        />
      )}
      <TestimonialsItemUpdate
        isOpen={!!itemToUpdate}
        onClose={() => setItemToUpdate(undefined)}
        item={itemToUpdate}
        clearItemToUpdate={() => setItemToUpdate(undefined)}
      />
      <TestimonialsUpdate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={section}
      />
      <EditSectionNav
        disabled={section.disabled}
        onClick={() => setIsOpen(true)}
      />
      <h2 id='testimonial-heading' className='sr-only'>
        Testimonials Section
      </h2>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <Heading2 value={section.title} id='testimonial-heading' />
        <div className='mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0'>
          {items.map((item) => (
            <blockquote
              key={item.id}
              className='relative group sm:flex lg:block'
            >
              <svg
                width={24}
                height={18}
                viewBox='0 0 24 18'
                aria-hidden='true'
                className='flex-shrink-0'
              >
                <path
                  d='M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z'
                  fill='currentColor'
                />
              </svg>
              <div className='mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10'>
                <Paragraph value={item.content} />
                <cite className='mt-4 block text-textSecondary font-semibold not-italic'>
                  {item.author}
                </cite>
              </div>
              <IconButtonHover
                items={[
                  {
                    disabled: loading,
                    className: 'mr-4',
                    icon: <CiTrash size={28} />,
                    onClick: () => onDelete(item.id),
                  },
                  {
                    onClick: () => {
                      setItemToUpdate(item)
                    },
                    icon: <CiEdit size={28} />,
                  },
                ]}
              />
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  )
}
