import Image from 'next/image'
import { Heading1 } from '@/components/text/Heading1'
import { CustomLink } from '@/components/CustomLink'
import Link from 'next/link'

//todo
const collections = [
  {
    name: "Women's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: "Men's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'Desk Accessories',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
    imageAlt:
      'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
]

export const LandingHeroAdmin = () => {
  return (
    <div className='relative'>
      {/* Background image and overlap */}
      <div
        aria-hidden='true'
        className='absolute top-0 left-0 right-0 bottom-0 hidden sm:flex sm:flex-col'
      >
        <div className='relative w-full flex-1'>
          <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
            <Image
              width={1000}
              height={1000}
              src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
              alt='hero image'
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='absolute top-0 left-0 right-0 bottom-0 opacity-50' />
        </div>
        <div className='h-32 w-full bg-white md:h-40 lg:h-48' />
      </div>

      <div className='relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8'>
        {/* Background image and overlap for mobile */}
        <div
          aria-hidden='true'
          className='absolute top-0 left-0 right-0 bottom-0 flex flex-col sm:hidden'
        >
          <div className='relative w-full flex-1'>
            <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
              <Image
                width={400}
                height={400}
                src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='absolute top-0 left-0 right-0 bottom-0 opacity-50' />
          </div>
        </div>
        <div className='relative py-32'>
          <Heading1 value='Mid-Season Sale' className='text-white' />
          <div className='mt-4 sm:mt-6'>
            <CustomLink
              title='Shop Collection'
              href='/#'
              className='inline-block rounded-md border border-transparent bg-accent px-8 py-3 text-white hover:bg-accentHover'
            />
          </div>
        </div>
      </div>

      <div
        aria-labelledby='collection-heading'
        className='relative -mt-96 sm:mt-0'
      >
        <h2 id='collection-heading' className='sr-only'>
          Collections
        </h2>
        <div className='mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8'>
          {collections.map((collection) => (
            <div
              key={collection.name}
              className='group relative h-96 rounded-lg bg-white shadow-md sm:aspect-h-5 sm:aspect-w-4 sm:h-auto'
            >
              <div>
                <div
                  aria-hidden='true'
                  className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg'
                >
                  <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden group-hover:opacity-75'>
                    <Image
                      width={1000}
                      height={1000}
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black opacity-50' />
                </div>
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-end rounded-lg p-6'>
                  <div>
                    <p aria-hidden='true' className='text-white'>
                      Shop the collection
                    </p>
                    <h3 className='mt-1 font-semibold text-white'>
                      <Link href={collection.href}>
                        <span className='absolute top-0 left-0 right-0 bottom-0' />
                        {collection.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
