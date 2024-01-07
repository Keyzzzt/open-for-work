import { prismaClient } from '@/prisma/prismaClient'
import Image from 'next/image'
import { Heading1 } from '@/components/text/Heading1'
import { Paragraph } from '@/components/text/Paragraph'
import { Heading2 } from '@/components/text/Heading2'
import Section from '@/components/Section'
import { Heading3 } from '@/components/text/Heading3'
import { BlogSectionClient } from '@/app/(public)/(c)/BlogSectionClient'
import { TimelineItem } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(timeline)/TimelineItem'
import { AboutValueItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(values)/AboutValueItems'
import { VacancyItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(vacancies)/VacancyItems'
import { StatisticsItems } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/(statisticts)/StatisticsItems'
import { EmptyState } from '@/components/EmptyState'

const AboutClient = async () => {
  try {
    const hero = await prismaClient.aboutHero.findFirst({})
    const timeline = await prismaClient.aboutTimeline.findFirst({})
    const mission = await prismaClient.aboutMission.findFirst({})
    const team = await prismaClient.aboutTeam.findFirst({})
    const values = await prismaClient.aboutValues.findFirst({})
    const partners = await prismaClient.aboutPartners.findFirst({
      include: { images: true },
    })
    const vacancies = await prismaClient.aboutVacancies.findFirst({
      include: { images: true },
    })
    const statistics = await prismaClient.aboutStatistics.findFirst({})

    const blog = await prismaClient.blogPage.findFirst({
      include: {
        blogItems: {
          where: {
            isFeatured: true,
          },
          take: 3,
        },
      },
    })
    return (
      <main className='isolate'>
        {hero && !hero.disabled && (
          <Section className='relative isolate -z-10 overflow-hidden'>
            <div className='py-5 sm:py-8'>
              <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
                <Heading1
                  className='max-w-2xl lg:col-span-2 xl:col-auto'
                  value={hero.title}
                />
                <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
                  <Paragraph className='leading-8' value={hero.description} />
                </div>
                <Image
                  width={400}
                  height={400}
                  src='https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80'
                  alt='about main image'
                  className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
                />
              </div>
            </div>
          </Section>
        )}

        {timeline && !timeline.disabled && (
          <Section className='mx-auto max-w-2xl lg:max-w-none'>
            <Heading2 className='mb-10' fontLarge value={timeline.mainTitle} />
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4'>
              <TimelineItem
                date={timeline.date1}
                dateTime={timeline.dateTime1}
                title={timeline.title1}
                description={timeline.description1}
                disabled={timeline.disabled1}
              />
              <TimelineItem
                date={timeline.date2}
                dateTime={timeline.dateTime2}
                title={timeline.title2}
                description={timeline.description2}
                disabled={timeline.disabled2}
              />
              <TimelineItem
                date={timeline.date3}
                dateTime={timeline.dateTime3}
                title={timeline.title3}
                description={timeline.description3}
                disabled={timeline.disabled3}
              />
              <TimelineItem
                date={timeline.date4}
                dateTime={timeline.dateTime4}
                title={timeline.title4}
                description={timeline.description4}
                disabled={timeline.disabled4}
              />
            </div>
          </Section>
        )}
        {mission && !mission.disabled && (
          <Section className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <Heading2 fontLarge value={mission.title} />
            <div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
              <div className='lg:w-full lg:max-w-2xl lg:flex-auto leading-8'>
                <Paragraph value={mission.description1} />
                <Paragraph className='mt-8' value={mission.description2} />
                <Paragraph className='mt-8' value={mission.description3} />
              </div>
              <div className='lg:flex lg:flex-auto lg:justify-center'>
                <dl className='flex justify-between lg:flex-col'>
                  <div className='flex flex-col gap-y-4'>
                    <Heading3 fontLarge value={mission.goalTitle1} />
                    <Heading3 fontSmall value={mission.goalDescription1} />
                  </div>{' '}
                  <div className='flex flex-col gap-y-4'>
                    <Heading3 fontLarge value={mission.goalTitle2} />
                    <Heading3 fontSmall value={mission.goalDescription2} />
                  </div>{' '}
                  <div className='flex flex-col gap-y-4'>
                    <Heading3 fontLarge value={mission.goalTitle3} />
                    <Heading3 fontSmall value={mission.goalDescription3} />
                  </div>
                </dl>
              </div>
            </div>
          </Section>
        )}

        {team && !team.disabled && (
          <Section className='lg:flex overflow-hidden'>
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-12 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8 lg:gap-x-8'>
              <div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8  leading-8'>
                <Heading2 fontLarge value={team.title} />
                <Paragraph className='mt-8' value={team.description1} />
                <Paragraph className='mt-8' value={team.description2} />
              </div>
              <div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
                <div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
                  <Image
                    width={400}
                    height={400}
                    src='https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80'
                    alt='team members'
                    className='aspect-[7/5] w-full lg:w-[37rem] max-w-none rounded-2xl object-cover'
                  />
                </div>
                <div className='hidden lg:contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8'>
                  <div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
                    <Image
                      width={400}
                      height={400}
                      src='https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80'
                      alt='team'
                      className='aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl object-cover'
                    />
                  </div>
                  <div className='lg:w-auto'>
                    <Image
                      width={400}
                      height={400}
                      src='https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80'
                      alt='team members'
                      className='aspect-[4/3] w-[37rem] max-w-none rounded-2xl object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {values && !values.disabled && (
          <Section>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <Heading2 fontLarge value={values.title} />
              <Paragraph
                className='mt-6 leading-8'
                value={values.description}
              />
            </div>
            <AboutValueItems
              disabled1={values.disabled1}
              title1={values.title1}
              description1={values.description1}
              disabled2={values.disabled2}
              title2={values.title2}
              description2={values.description2}
              disabled3={values.disabled3}
              title3={values.title3}
              description3={values.description3}
            />
          </Section>
        )}

        {partners && !partners.disabled && (
          <Section className='relative isolate'>
            <div>
              <Heading2 className='text-center' value={partners.title} />
              <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
                <Image
                  width={10}
                  height={10}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                  src='https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg'
                  alt='Transistor'
                />
                <Image
                  width={10}
                  height={10}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                  src='https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg'
                  alt='Reform'
                />
                <Image
                  width={10}
                  height={10}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                  src='https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg'
                  alt='Tuple'
                />
                <Image
                  width={10}
                  height={10}
                  className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
                  src='https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg'
                  alt='SavvyCal'
                />
                <Image
                  width={10}
                  height={10}
                  className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
                  src='https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg'
                  alt='Statamic'
                />
              </div>
            </div>
          </Section>
        )}

        {statistics && !statistics.disabled && (
          <Section>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <Heading2 fontLarge value={statistics.title} />
              <Paragraph
                className='mt-6 leading-7'
                value={statistics.description}
              />
            </div>
            <StatisticsItems
              title1={statistics.title1}
              result1={statistics.result1}
              description1={statistics.description1}
              disabled1={statistics.disabled1}
              title2={statistics.title2}
              result2={statistics.result2}
              description2={statistics.description2}
              disabled2={statistics.disabled2}
              title3={statistics.title3}
              result3={statistics.result3}
              description3={statistics.description3}
              disabled3={statistics.disabled3}
            />
          </Section>
        )}

        {vacancies && !vacancies.disabled && (
          <Section>
            <div className='mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row'>
              <div className='w-full lg:max-w-lg lg:flex-auto'>
                <Heading2 fontLarge value={vacancies.title} />
                <Paragraph className='mt-6' value={vacancies.description} />

                <Image
                  width={400}
                  height={400}
                  src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80'
                  alt=''
                  className='mt-16 aspect-[6/5] w-full rounded-2xl object-cover lg:aspect-auto lg:h-[34.5rem]'
                />
              </div>
              <VacancyItems
                title1={vacancies.title1}
                description1={vacancies.description1}
                salary1={vacancies.salary1}
                city1={vacancies.city1}
                disabled1={vacancies.disabled1}
                title2={vacancies.title2}
                description2={vacancies.description2}
                salary2={vacancies.salary2}
                city2={vacancies.city2}
                disabled2={vacancies.disabled2}
                title3={vacancies.title3}
                description3={vacancies.description3}
                salary3={vacancies.salary3}
                city3={vacancies.city3}
                disabled3={vacancies.disabled3}
              />
            </div>
          </Section>
        )}

        {/* Blog section */}
        {blog && !blog.isAboutSectionDisabled && (
          <BlogSectionClient section={blog} />
        )}
      </main>
    )
  } catch (err) {
    return <EmptyState title='Something went wrong' />
  }
}

export default AboutClient
