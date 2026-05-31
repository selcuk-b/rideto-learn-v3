import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Plus, HelpCircle, PenLine } from 'lucide-react'
import CourseForm from './course-form'
import ModuleList from './module-list'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export default async function CourseEditPage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: { _count: { select: { lessons: true } } },
      },
      quiz: { include: { _count: { select: { questions: true } } } },
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
      <section className="mb-8">
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

      {/* Quiz */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400">Quiz</h2>
          {!course.quiz && (
            <Link
              href={`/admin/courses/${course.id}/quiz`}
              className="inline-flex items-center gap-1.5 bg-[#2B2B2B] hover:bg-[#434343] text-white font-heading text-xs uppercase tracking-widest px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={12} /> Add Quiz
            </Link>
          )}
        </div>

        {course.quiz ? (
          <Link
            href={`/admin/courses/${course.id}/quiz`}
            className="group bg-white border border-gray-200 hover:border-[#2CCEAC]/40 rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:shadow-sm"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2CCEAC]/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle size={16} className="text-[#2CCEAC]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2CCEAC] transition-colors">
                {course.quiz.title}
              </p>
              <p className="text-xs text-gray-400">
                {course.quiz._count.questions} questions · Pass mark: {course.quiz.passingScore}%
              </p>
            </div>
            <PenLine size={14} className="text-gray-300 group-hover:text-[#2CCEAC] transition-colors flex-shrink-0" />
          </Link>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl text-gray-400">
            <HelpCircle size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No quiz yet. Add one above.</p>
          </div>
        )}
      </section>
    </div>
  )
}
