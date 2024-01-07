import { FC } from 'react'
import { CustomLink } from '@/components/CustomLink'
import { TableTH } from '@/components/TableTh'
import { Table } from '@/components/Table'
import { EmptyState } from '@/components/EmptyState'
import { StoryRow } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/StoryRow'
import { StoryListType } from '@/helpers/getAllStoriesForAdminList'
import { Heading2 } from '@/components/text/Heading2'

type Props = {
  stories: StoryListType[]
}
export const StoriesAdminList: FC<Props> = async ({ stories }) => {
  if (stories.length === 0) {
    return (
      <EmptyState
        href='/dashboard/entities/stories/create'
        title='Blog stories not found'
        subTitle='Create new story'
      />
    )
  }

  return (
    <>
      <div className='flex justify-end mt-4'>
        <CustomLink title='New' href='/dashboard/entities/stories/create' />
      </div>
      <div className='overflow-x-auto inline-block min-w-full align-middle'>
        <Heading2 value='Stories list' className='mb-6' />
        <Table>
          <thead>
            <tr>
              <TableTH value='Title' />
              <TableTH value='Added' />
              <TableTH value='Updated' />
              <TableTH value='Disabled' />
              <TableTH value='Featured' />
            </tr>
          </thead>
          <tbody className='divide-y divide-borderColor'>
            {stories.map((s) => (
              <StoryRow story={s} key={s.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
