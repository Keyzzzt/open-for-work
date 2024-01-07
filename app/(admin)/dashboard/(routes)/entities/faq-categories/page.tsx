import { Suspense } from 'react'
import Await from '@/components/Await'
import { ListSkeleton } from '@/components/ListSkeleton'
import { FAQCategoriesList } from '@/app/(admin)/dashboard/(routes)/entities/faq-categories/(c)/FAQCategoriesList'
import { getAllFAQCategoriesForAdminList } from '@/helpers/getAllFAQCategoriesForAdminList'

const FAQAdminPage = async () => {
  const promise = getAllFAQCategoriesForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <FAQCategoriesList categories={data} />}
      </Await>
    </Suspense>
  )
}

export default FAQAdminPage
