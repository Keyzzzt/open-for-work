import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { storySchema } from '@/schemas'

// Update Story
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
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

    // Check if story exists with given ID
    const { id } = params
    const story = await prismaClient.blogItem.findUnique({
      where: {
        id,
      },
    })

    if (!story) {
      return NextResponse.json(
        { errors: ['Story not found!'] },
        {
          status: 404,
        },
      )
    }
    const body = await req.json()

    // Check the body
    const errors = validateBody(body, storySchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.blogItem.update({
      where: {
        id,
      },
      data: {
        ...body,
        paragraphs: { deleteMany: {} },
      },
    })

    // Rewrite paragraphs
    await prismaClient.blogItem.update({
      where: {
        id,
      },
      data: {
        paragraphs: { createMany: { data: body.paragraphs } },
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/blog/stories/id PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}

// Delete story
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
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

    // Check if story with given id exists
    const { id } = params
    const story = await prismaClient.blogItem.findUnique({
      where: { id },
    })
    if (!story) {
      return NextResponse.json(
        { errors: ['Story not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.blogItem.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/blog/stories/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
