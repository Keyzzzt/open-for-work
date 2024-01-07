import { Paragraph } from '@/components/text/Paragraph'
import { FC } from 'react'
import { Social } from '.prisma/client'
import { FaTiktok } from 'react-icons/fa6'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

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
  socials: Social[] | null
}

export const FooterAdmin: FC<Props> = ({ socials }) => {
  return (
    <footer className='mt-auto py-8 md:px-10 md:flex md:items-center md:justify-between border-t border-borderColor'>
      <div className='flex justify-center items-center space-x-6 md:order-2'>
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
      <div className='mt-4 md:order-1 md:mt-0'>
        <Paragraph
          fontSmall
          className='text-center'
          value='&copy; 2020 Your Company, Inc. All rights reserved.'
        />
        <p className=' text-xs leading-5'></p>
      </div>
    </footer>
  )
}
