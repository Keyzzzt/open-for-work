export const ListSkeleton = () => {
  return (
    <div className='animate-pulse mt-8'>
      <div className='flex items-center justify-end'>
        <p className='block h-8 w-20 rounded-md bg-gray' />
      </div>
      <div className='mt-8 min-w-full'>
        {[...Array(10)].map((item, index) => (
          <li key={index} className='list-none'>
            <p className='mt-6 block h-4 rounded-lg bg-gray' />
          </li>
        ))}
      </div>
    </div>
  )
}
