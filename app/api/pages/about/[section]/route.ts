import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import {
  aboutHeroSchema,
  aboutMissionSchema,
  aboutStatisticsSchema,
  aboutTeamSchema,
  aboutTimelineSchema,
  aboutVacancySchema,
  aboutValuesSchema,
} from '@/schemas'

// Update About page
export async function PATCH(
  req: Request,
  { params }: { params: { section: string } },
) {
  try {
    // Check user
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { errors: ['Unauthorized!'] },
        {
          status: 401,
        },
      )
    }

    // Check product ID
    const { section } = params
    if (!section) {
      return NextResponse.json(
        { errors: ['Section is required!'] },
        {
          status: 400,
        },
      )
    }

    switch (section) {
      case 'hero': {
        const body = await req.json()
        const errors = validateBody(body, aboutHeroSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutHero.updateMany({
          data: { ...body },
        })
        break
      }
      case 'timeline': {
        const body = await req.json()
        const errors = validateBody(body, aboutTimelineSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }
        await prismaClient.aboutTimeline.updateMany({
          data: { ...body },
        })
        break
      }
      case 'mission': {
        const body = await req.json()
        const errors = validateBody(body, aboutMissionSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutMission.updateMany({
          data: { ...body },
        })
        break
      }
      case 'team': {
        const body = await req.json()
        const errors = validateBody(body, aboutTeamSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutTeam.updateMany({
          data: { ...body },
        })
        break
      }
      case 'values': {
        const body = await req.json()
        const errors = validateBody(body, aboutValuesSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutValues.updateMany({
          data: { ...body },
        })
        break
      }
      case 'vacancies': {
        const body = await req.json()
        const errors = validateBody(body, aboutVacancySchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutVacancies.updateMany({
          data: { ...body },
        })
        break
      }
      case 'statistics': {
        const body = await req.json()
        const errors = validateBody(body, aboutStatisticsSchema)
        if (errors) {
          return NextResponse.json(
            { errors },
            {
              status: 400,
            },
          )
        }

        await prismaClient.aboutStatistics.updateMany({
          data: { ...body },
        })
        break
      }
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/products POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
