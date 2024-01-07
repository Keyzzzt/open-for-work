'use client'
import Link from 'next/link'
import { CustomButton } from '@/components/CustomButton'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { subscribeSchema, TSubscribeSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Social } from '.prisma/client'
import { FC } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'

const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Jobs', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
}

const icons = {
  facebook: <FaFacebook className='h-6 w-6' />,
  instagram: <FaInstagram className='h-6 w-6' />,
  twitter: <FaTwitter className='h-6 w-6' />,
  youtube: <FaYoutube className='h-7 w-7' />,
  tikTok: <FaTiktok className='h-6 w-6' />,
  pinterest: <FaPinterest className='h-6 w-6' />,
  linkedIn: <FaLinkedin className='h-6 w-6' />,
}

type Props = {
  socials: Social[]
}

export const FooterClient: FC<Props> = ({ socials }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSubscribeSchema>({ resolver: zodResolver(subscribeSchema) })

  const footerMenu = []
  for (const key in navigation) {
    const heading = capitalizeFirstLetter(key)
    const menuItem = (
      <div>
        <Paragraph value={heading} className='font-bold' />
        <ul role='list' className='mt-6 space-y-4'>
          {navigation[key as keyof typeof navigation].map((item) => (
            <li key={item.name}>
              <Link href={item.href} className='hover:text-textHover'>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
    footerMenu.push(menuItem)
  }

  const onSubmit = async (data: TSubscribeSchema) => {
    // TODO: submit to server
    // Save to local storage

    toast.success('Show modal with greetings!!!')
    reset()
  }

  return (
    <footer className='mt-auto py-8' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex w-full justify-between'>{footerMenu}</div>
        <div className='mt-10 lg:mt-0 lg:ml-20 min-w-[500px]'>
          <Heading3 value='Subscribe to our newsletter' />
          <Paragraph
            value='The latest news, articles, and resources, sent to your inbox weekly.'
            className='mt-2'
          />
          <form
            className='mt-6 sm:flex items-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor='subscibe-email' className='sr-only'>
              Email address
            </label>
            <Input
              register={register}
              errors={errors}
              id='subscibe-email'
              type='email'
              name='email'
              label=''
              placeholder='Enter your email'
              className='mt-0'
            />
            <div className='mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0'>
              <CustomButton
                disabled={isSubmitting}
                fill='primary'
                type='submit'
                title='Subscribe'
              />
            </div>
          </form>
        </div>
      </div>
      <div className='mt-10 pt-4 border-t border-borderColor flex flex-col items-center md:flex-row md:justify-between'>
        <div className='flex space-x-6 md:order-2'>
          {socials?.map((s) => {
            if (!s.url) {
              return null
            }
            return (
              <a
                target='_blank'
                key={s.id}
                href={s.url}
                className='hover:text-textHover'
              >
                {icons[s.title as keyof typeof icons]}
              </a>
            )
          })}
        </div>
        <Paragraph
          fontSmall
          className='mt-4 md:order-1 md:mt-0'
          value='&copy; 2020 Your Company, Inc. All rights reserved.'
        />
      </div>
    </footer>
  )
}
