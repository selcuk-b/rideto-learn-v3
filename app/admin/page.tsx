import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { BookOpen, ChevronRight, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const courses = await prisma.course.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { modules: true } },
      modules: {
        include: { _count: { select: { lessons: true } } },
      },
    },
  })

  const totalLessons = courses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m._count.lessons, 0),
    0
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl uppercase text-[#2B2B2B]">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">
            {courses.length} course{courses.length !== 1 ? 's' : ''} · {totalLessons} lessons total
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-[#2CCEAC] hover:bg-[#25b899] text-white font-heading text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={14} />
          New Course
        </Link>
      </div>

      {/* Course list */}
      <div className="flex flex-col gap-3">
        {courses.map((course) => {
          const lessonCount = course.modules.reduce((s, m) => s + m._count.lessons, 0)
          return (
            <Link
              key={course.id}
              href={`/admin/courses/${course.id}`}
              className="group bg-white border border-gray-200 hover:border-[#2CCEAC]/40 rounded-xl p-5 flex items-center gap-4 transition-all hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2CCEAC]/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-[#2CCEAC]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-heading text-sm uppercase text-gray-800 group-hover:text-[#2CCEAC] transition-colors">
                    {course.title}
                  </h2>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    course.status === 'published'
                      ? 'bg-[#2CCEAC]/10 text-[#2CCEAC]'
                      : course.status === 'draft'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {course._count.modules} modules · {lessonCount} lessons · {course.estimatedTime}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2CCEAC] transition-colors flex-shrink-0" />
            </Link>
          )
        })}

        {courses.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No courses yet. Create your first one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
