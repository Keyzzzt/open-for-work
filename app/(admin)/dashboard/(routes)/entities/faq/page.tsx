import { FAQAdminList } from '@/app/(admin)/dashboard/(routes)/entities/faq/(c)/FAQAdminList'
import { ListSkeleton } from '@/components/ListSkeleton'
import { Suspense } from 'react'
import Await from '@/components/Await'
import { getAllFAQsForAdminList } from '@/helpers/getAllFAQsForAdminList'

const FAQAdminPage = async () => {
  const promise = getAllFAQsForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <FAQAdminList faqs={data} />}
      </Await>
    </Suspense>
  )
}

export default FAQAdminPage
