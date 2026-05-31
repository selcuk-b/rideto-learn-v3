import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string } }

// GET — fetch quiz for a course (with all questions)
export async function GET(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const quiz = await prisma.quiz.findUnique({
    where: { courseId: params.id },
    include: { questions: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(quiz ?? null)
}

// POST — create a new quiz for a course
export async function POST(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const { title, description, passingScore } = await request.json()
  if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

  const quiz = await prisma.quiz.create({
    data: {
      title: title ?? 'Quiz',
      description: description ?? '',
      passingScore: passingScore ?? 70,
      courseId: params.id,
    },
  })
  return NextResponse.json(quiz, { status: 201 })
}

// PATCH — update quiz metadata
export async function PATCH(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const { title, description, passingScore } = await request.json()

  const quiz = await prisma.quiz.findUnique({ where: { courseId: params.id } })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })

  const updated = await prisma.quiz.update({
    where: { id: quiz.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(passingScore !== undefined && { passingScore: Number(passingScore) }),
    },
  })
  return NextResponse.json(updated)
}

// DELETE — remove the entire quiz
export async function DELETE(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const quiz = await prisma.quiz.findUnique({ where: { courseId: params.id } })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })

  await prisma.quiz.delete({ where: { id: quiz.id } })
  return NextResponse.json({ ok: true })
}
