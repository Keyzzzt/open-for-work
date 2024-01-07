import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { testimonialsSchema } from '@/schemas'

// Update testimonials page
export async function PATCH(req: Request) {
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

    // Check body
    const body = await req.json()
    const errors = validateBody(body, testimonialsSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    const page = await prismaClient.landingTestimonials.findFirst({})
    if (!page) {
      return NextResponse.json(
        { errors: ['Testimonials page not found!'] },
        {
          status: 401,
        },
      )
    }

    await prismaClient.landingTestimonials.updateMany({
      data: { ...body },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/landing/testimonials POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
