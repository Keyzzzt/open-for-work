import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'

// Removes single image from DB
// productId in this case unnecessary because public_id is unique
export async function DELETE(
  req: Request,
  { params }: { params: { folderName: string; imagePublicId: string } },
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

    // Check if image exists with given params
    const { folderName, imagePublicId } = params
    const public_id = `${folderName}/${imagePublicId}`
    const image = await prismaClient.image.findFirst({
      where: {
        public_id,
      },
    })
    if (!image) {
      return NextResponse.json(
        { errors: ['Image not found!'] },
        { status: 404 },
      )
    }

    await prismaClient.image.deleteMany({
      where: {
        public_id,
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(
      `/api/images/productId/folderName/imagePublicId DELETE ${error}`,
    )
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
