import Link from "next/link";
import {
  Bike,
  BookCheck,
  Award,
  Settings,
  Languages,
  ShieldCheck,
  Gauge,
  Lock,
  ChevronRight,
} from "lucide-react";
import type { CatalogueCourse } from "@/lib/course-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Bike,
  BookCheck,
  Award,
  Settings,
  Languages,
  ShieldCheck,
  Gauge,
};

interface Props {
  course: CatalogueCourse;
  progress?: { completed: number; total: number };
}

export default function CourseCard({ course, progress }: Props) {
  const Icon = iconMap[course.icon] ?? Bike;
  const progressPct = progress ? Math.round((progress.completed / progress.total) * 100) : 0;

  if (course.comingSoon) {
    return (
      <div className="relative bg-white border border-gray-200 rounded-xl p-5 opacity-60 cursor-default select-none">
        {/* Coming Soon badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-gray-100 text-gray-500 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          <Lock size={10} strokeWidth={2.5} />
          Coming Soon
        </div>

        {/* Stage label */}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
          {course.stage}
        </span>

        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon size={18} strokeWidth={1.75} className="text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 text-[15px] leading-snug">{course.title}</h3>
            <p className="text-xs text-gray-400 italic mt-0.5">&ldquo;{course.tagline}&rdquo;</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mt-2 line-clamp-2">{course.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
          <span>{course.moduleCount} modules</span>
          <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
          <span>{course.phase}</span>
        </div>
      </div>
    );
  }

  // Active course card
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group relative bg-white border border-gray-200 hover:border-[#2CCEAC]/40 rounded-xl p-5 transition-all hover:shadow-md"
    >
      {/* Active badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#2CCEAC]/10 text-[#2CCEAC] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
        Available Now
      </div>

      {/* Stage label */}
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2CCEAC] mb-2 block">
        {course.stage}
      </span>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 bg-[#2CCEAC]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={18} strokeWidth={1.75} className="text-[#2CCEAC]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-[15px] leading-snug group-hover:text-[#2CCEAC] transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 italic mt-0.5">&ldquo;{course.tagline}&rdquo;</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-2">{course.description}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
        <span>{course.moduleCount} modules</span>
        <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
        <span>Free</span>
      </div>

      {/* Progress bar (if user has started) */}
      {progress && progress.completed > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-gray-500">
              {progress.completed}/{progress.total} lessons
            </span>
            <span className="font-semibold text-[#2CCEAC]">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #2CCEAC, #1fb896)",
              }}
            />
          </div>
        </div>
      )}

      {/* Arrow */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-[#2CCEAC]" />
      </div>
    </Link>
  );
}
