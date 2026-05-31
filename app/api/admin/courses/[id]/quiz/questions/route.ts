import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string } }

export async function POST(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const quiz = await prisma.quiz.findUnique({ where: { courseId: params.id } })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })

  const { questionText, options, correctAnswerIndex, explanation, image } = await request.json()

  const last = await prisma.question.findFirst({
    where: { quizId: quiz.id },
    orderBy: { order: 'desc' },
  })
  const order = (last?.order ?? 0) + 1

  const question = await prisma.question.create({
    data: {
      questionText: questionText ?? '',
      options: options ?? ['', '', '', ''],
      correctAnswerIndex: correctAnswerIndex ?? 0,
      explanation: explanation ?? '',
      image: image || null,
      order,
      quizId: quiz.id,
    },
  })
  return NextResponse.json(question, { status: 201 })
}
