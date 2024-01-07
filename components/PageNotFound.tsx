import { CustomLink } from '@/components/CustomLink'

export const PageNotFound = () => {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='font-semibold'>404</p>
        <h1 className='mt-4 text-3xl font-bold sm:text-4xl'>Page not found</h1>
        <p className='mt-6 leading-7'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <CustomLink title='Go back home' href='/' />
          <CustomLink
            title='Contact support'
            href='/contact'
            className='bg-white text-textColor hover:text-textHover hover:bg-white active:bg-white'
          />
        </div>
      </div>
    </main>
  )
}
