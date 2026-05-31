import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { ChevronLeft, Plus } from 'lucide-react'
import CourseForm from './course-form'
import ModuleList from './module-list'

interface Props { params: { id: string } }

export default async function CourseEditPage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: { _count: { select: { lessons: true } } },
      },
    },
  })
  if (!course) notFound()

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6">
        <ChevronLeft size={14} /> All courses
      </Link>

      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">{course.title}</h1>

      {/* Course metadata form */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-5">Course Details</h2>
        <CourseForm course={course} />
      </section>

      {/* Modules */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400">
            Modules ({course.modules.length})
          </h2>
          <Link
            href={`/admin/courses/${course.id}/modules/new`}
            className="inline-flex items-center gap-1.5 bg-[#2B2B2B] hover:bg-[#434343] text-white font-heading text-xs uppercase tracking-widest px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Module
          </Link>
        </div>
        <ModuleList courseId={course.id} modules={course.modules} />
      </section>
    </div>
  )
}
