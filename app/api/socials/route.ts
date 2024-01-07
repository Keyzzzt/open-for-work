import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { socialsSchema } from '@/schemas'

// Update socials media
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

    // Check body
    const body = await req.json()
    const errors = validateBody(body, socialsSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    let arr = []
    for (const key in body) {
      arr.push({ title: key, url: body[key] })
    }

    await prismaClient.social.deleteMany({})
    await prismaClient.social.createMany({
      data: arr,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/products POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
