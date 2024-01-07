import { prismaClient } from '@/prisma/prismaClient'
import { EmptyState } from '@/components/EmptyState'
import { AboutMain } from '@/app/(admin)/dashboard/(routes)/pages/about/AboutMain'
import { AboutHeroAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(hero)/AboutHeroAdmin'
import { AboutTimelineAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(timeline)/AboutTimelineAdmin'
import { AboutMissionAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/mission/AboutMissionAdmin'
import { AboutTeamAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(team)/AboutTeamAdmin'
import { AboutValuesAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(values)/AboutValuesAdmin'
import { AboutPartnersAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/AboutPartnersAdmin'
import { AboutVacanciesAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(vacancies)/AboutVacanciesAdmin'
import { AboutStatisticsAdmin } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(statisticts)/AboutStatisticsAdmin'

const AboutPageAdmin = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const section =
    typeof searchParams.section === 'string' ? searchParams.section : ''

  let toRender = <EmptyState title='No data. Please check database' />

  switch (section) {
    case 'hero':
      try {
        const sectionData = await prismaClient.aboutHero.findFirst({
          include: { images: true },
        })

        if (sectionData) {
          toRender = <AboutHeroAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Hero fetch failed' />
      }
      break
    case 'timeline':
      try {
        const sectionData = await prismaClient.aboutTimeline.findFirst({})
        if (sectionData) {
          toRender = <AboutTimelineAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Timeline fetch failed' />
      }
      break
    case 'mission':
      try {
        const sectionData = await prismaClient.aboutMission.findFirst({})
        if (sectionData) {
          toRender = <AboutMissionAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Mission fetch failed' />
      }
      break
    case 'team':
      try {
        const sectionData = await prismaClient.aboutTeam.findFirst({
          include: { images: true },
        })
        if (sectionData) {
          toRender = <AboutTeamAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Section fetch failed' />
      }
      break
    case 'values':
      try {
        const sectionData = await prismaClient.aboutValues.findFirst({})
        if (sectionData) {
          toRender = <AboutValuesAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Section fetch failed' />
      }
      break
    case 'partners':
      try {
        const sectionData = await prismaClient.aboutPartners.findFirst({
          include: { images: true },
        })
        if (sectionData) {
          toRender = <AboutPartnersAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Section fetch failed' />
      }
      break
    case 'statistics':
      try {
        const sectionData = await prismaClient.aboutStatistics.findFirst({})
        if (sectionData) {
          toRender = <AboutStatisticsAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Section fetch failed' />
      }
      break
    case 'vacancies':
      try {
        const sectionData = await prismaClient.aboutVacancies.findFirst({
          include: { images: true },
        })
        if (sectionData) {
          toRender = <AboutVacanciesAdmin section={sectionData} />
        }
      } catch (err) {
        console.error('Failed to fetch section data')
        toRender = <EmptyState title='Section fetch failed' />
      }
      break
    default: {
      toRender = <EmptyState title='Section not found' />
    }
  }

  return <AboutMain currentSection={section}>{toRender}</AboutMain>
}

export default AboutPageAdmin
