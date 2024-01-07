import { FC } from 'react'
import Image from 'next/image'
import { Heading2 } from '@/components/text/Heading2'
import { EnableDisable } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EnableDisable'
import { AboutPartners } from '.prisma/client'

type Props = {
  section: AboutPartners & { images: any[] }
}
// todo
export const AboutPartnersAdmin: FC<Props> = ({ section }) => {
  return (
    <div className='relative isolate'>
      <EnableDisable disabled={section.disabled} />
      <Heading2 className='text-center' value={section.title} />
      <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
        <Image
          width={10}
          height={10}
          className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
          src='https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg'
          alt='Transistor'
        />
        <Image
          width={10}
          height={10}
          className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
          src='https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg'
          alt='Reform'
        />

        <Image
          width={10}
          height={10}
          className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
          src='https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg'
          alt='Tuple'
        />

        <Image
          width={10}
          height={10}
          className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
          src='https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg'
          alt='SavvyCal'
        />

        <Image
          width={10}
          height={10}
          className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
          src='https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg'
          alt='Statamic'
        />
      </div>
    </div>
  )
}
