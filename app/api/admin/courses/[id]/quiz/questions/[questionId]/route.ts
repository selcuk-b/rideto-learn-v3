import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string; questionId: string } }

export async function PATCH(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const { questionText, options, correctAnswerIndex, explanation, image } = await request.json()

  const question = await prisma.question.update({
    where: { id: params.questionId },
    data: {
      ...(questionText !== undefined && { questionText }),
      ...(options !== undefined && { options }),
      ...(correctAnswerIndex !== undefined && { correctAnswerIndex: Number(correctAnswerIndex) }),
      ...(explanation !== undefined && { explanation }),
      ...(image !== undefined && { image: image || null }),
    },
  })
  return NextResponse.json(question)
}

export async function DELETE(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  await prisma.question.delete({ where: { id: params.questionId } })
  return NextResponse.json({ ok: true })
}
