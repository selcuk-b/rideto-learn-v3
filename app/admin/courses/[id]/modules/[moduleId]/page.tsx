import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { ChevronLeft, Plus } from 'lucide-react'
import ModuleForm from './module-form'
import LessonList from './lesson-list'

interface Props { params: { id: string; moduleId: string } }

export default async function ModuleEditPage({ params }: Props) {
  const mod = await prisma.module.findUnique({
    where: { id: params.moduleId },
    include: {
      lessons: { orderBy: { order: 'asc' } },
      course: { select: { title: true } },
    },
  })
  if (!mod) notFound()

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/courses/${params.id}`} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-2">
        <ChevronLeft size={14} /> {mod.course.title}
      </Link>
      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">{mod.title}</h1>

      {/* Module form */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-5">Module Details</h2>
        <ModuleForm mod={mod} courseId={params.id} />
      </section>

      {/* Lessons */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400">
            Lessons ({mod.lessons.length})
          </h2>
          <Link
            href={`/admin/courses/${params.id}/modules/${params.moduleId}/lessons/new`}
            className="inline-flex items-center gap-1.5 bg-[#2B2B2B] hover:bg-[#434343] text-white font-heading text-xs uppercase tracking-widest px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Lesson
          </Link>
        </div>
        <LessonList courseId={params.id} moduleId={params.moduleId} lessons={mod.lessons} />
      </section>
    </div>
  )
}
