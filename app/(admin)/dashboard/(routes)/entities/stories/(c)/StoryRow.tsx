'use client'
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TableTD } from '@/components/TableTD'
import { TableRow } from '@/components/TableRow'
import { StoryListType } from '@/helpers/getAllStoriesForAdminList'

type Props = {
  story: StoryListType
}
export const StoryRow: FC<Props> = ({ story }) => {
  const router = useRouter()
  let cells: ReactNode[] = []
  const url = `/dashboard/entities/stories/${story.id}`

  for (let key in story) {
    if (key !== 'id') {
      if (story[key as keyof StoryListType] === false) {
        cells.push(<TableTD key={key} value='No' />)
      } else if (story[key as keyof StoryListType] === true) {
        cells.push(<TableTD key={key} value='Yes' />)
      } else {
        cells.push(
          <TableTD
            key={key}
            value={story[key as keyof StoryListType].toString()}
          />,
        )
      }
    }
  }

  return <TableRow onClick={() => router.push(url)}>{cells}</TableRow>
}
