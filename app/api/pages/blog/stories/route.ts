import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { storySchema } from '@/schemas'

// Create new story
export async function POST(req: Request) {
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

    // check for blog id
    const body = await req.json()
    if (!body.blogPageId) {
      return NextResponse.json(
        { errors: ['Blog ID is missing!'] },
        {
          status: 400,
        },
      )
    }

    // Check if blog with given id exists
    const blog = await prismaClient.blogPage.findUnique({
      where: {
        id: body.blogPageId,
      },
    })
    if (!blog) {
      return NextResponse.json(
        { errors: ['Blog page not found!'] },
        {
          status: 404,
        },
      )
    }

    // Check body
    const errors = validateBody(body, storySchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    const story = await prismaClient.blogItem.create({
      data: {
        ...body,
        paragraphs: {
          createMany: {
            data: body.paragraphs,
          },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: story.id },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/blog/stories POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
