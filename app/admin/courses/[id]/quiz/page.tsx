import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import QuizEditor from './quiz-editor'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export default async function QuizPage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    select: { title: true },
  })
  if (!course) notFound()

  const quiz = await prisma.quiz.findUnique({
    where: { courseId: params.id },
    include: { questions: { orderBy: { order: 'asc' } } },
  })

  return (
    <div className="max-w-3xl">
      <Link
        href={`/admin/courses/${params.id}`}
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-2"
      >
        <ChevronLeft size={14} /> {course.title}
      </Link>
      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">
        {quiz ? quiz.title : 'New Quiz'}
      </h1>
      <QuizEditor courseId={params.id} quiz={quiz} />
    </div>
  )
}
