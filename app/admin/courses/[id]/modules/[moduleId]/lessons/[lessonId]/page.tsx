import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import LessonEditor from './lesson-editor'

interface Props { params: { id: string; moduleId: string; lessonId: string } }

export default async function LessonEditPage({ params }: Props) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { module: { select: { title: true } } },
  })
  if (!lesson) notFound()

  return (
    <div className="max-w-4xl">
      <Link
        href={`/admin/courses/${params.id}/modules/${params.moduleId}`}
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-2"
      >
        <ChevronLeft size={14} /> {lesson.module.title}
      </Link>
      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">{lesson.title}</h1>
      <LessonEditor lesson={lesson} courseId={params.id} moduleId={params.moduleId} />
    </div>
  )
}
