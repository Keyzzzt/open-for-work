import { Suspense } from 'react'
import Await from '@/components/Await'
import { ListSkeleton } from '@/components/ListSkeleton'
import { getAllTestimonialsForAdminList } from '@/helpers/getAllTestimonialsForAdminList'
import { TestimonialsAdminList } from '@/app/(admin)/dashboard/(routes)/entities/testimonials/(c)/TestimonialsAdminList'

const TestimonialsListAdmin = async () => {
  const promise = getAllTestimonialsForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <TestimonialsAdminList items={data} />}
      </Await>
    </Suspense>
  )
}

export default TestimonialsListAdmin
