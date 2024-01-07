import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { faqCategorySchema } from '@/schemas'

// Update FAQ category
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

    // Check ID and category in DB
    const { id } = params
    const category = await prismaClient.faqCategory.findUnique({
      where: { id },
    })
    if (!category) {
      return NextResponse.json(
        { errors: ['FAQ category not found!'] },
        { status: 404 },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, faqCategorySchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.faqCategory.update({
      where: {
        id,
      },
      data: { ...body },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/faq-categories/id PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}

// Delete FAQ category
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

    // Check ID and category in DB
    const { id } = params
    const category = await prismaClient.faqCategory.findUnique({
      where: { id },
    })
    if (!category) {
      return NextResponse.json(
        { errors: ['Category not found!'] },
        { status: 404 },
      )
    }

    // Check not allowed to delete All category
    if (category?.title === 'All') {
      return NextResponse.json(
        { errors: ["All category can't be deleted!"] },
        { status: 400 },
      )
    }

    // Check if category is in use
    const faqItems = await prismaClient.faqItem.findMany({
      where: { id },
    })
    if (faqItems.length > 0) {
      return NextResponse.json(
        { errors: ['Category is in use.'] },
        { status: 400 },
      )
    }

    await prismaClient.faqCategory.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/faq-categories/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
