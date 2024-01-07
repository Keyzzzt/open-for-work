import { Suspense } from 'react'
import Await from '@/components/Await'
import { ListSkeleton } from '@/components/ListSkeleton'
import { getAllStoriesForAdminList } from '@/helpers/getAllStoriesForAdminList'
import { StoriesAdminList } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/StoriesAdminList'

const StoriesListAdmin = async () => {
  const promise = getAllStoriesForAdminList()

  return (
    <Suspense fallback={<ListSkeleton />}>
      <Await promise={promise}>
        {({ data }) => <StoriesAdminList stories={data} />}
      </Await>
    </Suspense>
  )
}

export default StoriesListAdmin
