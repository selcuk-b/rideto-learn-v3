import Link from "next/link";
import { MapPin, ClipboardList, CheckSquare, ChevronRight, CheckCircle2, TriangleAlert, ShieldAlert } from "lucide-react";
import { Module, COURSE_SLUG } from "@/lib/course-data";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={20} strokeWidth={1.75} />,
  TriangleAlert: <TriangleAlert size={20} strokeWidth={1.75} />,
  ClipboardList: <ClipboardList size={20} strokeWidth={1.75} />,
  ShieldAlert: <ShieldAlert size={20} strokeWidth={1.75} />,
  CheckSquare: <CheckSquare size={20} strokeWidth={1.75} />,
};

interface ModuleCardProps {
  module: Module;
  completedLessons?: number;
  quizScore?: number | null;
}

export default function ModuleCard({
  module,
  completedLessons = 0,
  quizScore = null,
}: ModuleCardProps) {
  const total = module.lessons.length;
  const progressPct = total > 0 ? Math.round((completedLessons / total) * 100) : 0;
  const isComplete = completedLessons === total;
  const quizPassed = quizScore !== null && quizScore >= module.quiz.passingScore;

  return (
    <Link
      href={`/courses/${COURSE_SLUG}/modules/${module.slug}`}
      className="group block bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#2CCEAC]/50 hover:shadow-lg transition-all duration-200"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start gap-4">
        {/* Icon badge */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isComplete
              ? "bg-[#2CCEAC]/15 text-[#2CCEAC]"
              : "bg-gray-100 text-gray-500 group-hover:bg-[#2CCEAC]/10 group-hover:text-[#2CCEAC]"
          }`}
        >
          {module.icon ? iconMap[module.icon] : null}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-xs font-semibold text-[#2CCEAC] uppercase tracking-wide">
              Module {module.order}
            </span>
            {isComplete ? (
              <span className="flex items-center gap-1 text-xs font-medium text-[#2CCEAC]">
                <CheckCircle2 size={12} />
                Complete
              </span>
            ) : (
              <span className="text-xs text-gray-400">{total} lessons</span>
            )}
          </div>

          <h2 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#2CCEAC] transition-colors leading-snug mb-1">
            {module.title}
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {module.description}
          </p>

          {/* Lesson progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: isComplete
                    ? "linear-gradient(90deg, #2CCEAC, #1fb896)"
                    : "#2CCEAC",
                }}
              />
            </div>
            <span className="flex-shrink-0 text-xs text-gray-400 font-medium tabular-nums">
              {completedLessons}/{total}
            </span>
          </div>

          {/* Quiz score badge */}
          {quizScore !== null && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  quizPassed
                    ? "bg-[#2CCEAC]/12 text-[#2CCEAC]"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                Quiz: {quizScore}%{quizPassed ? " ✓" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className="flex-shrink-0 text-gray-300 group-hover:text-[#2CCEAC] group-hover:translate-x-0.5 transition-all mt-0.5"
        />
      </div>
    </Link>
  );
}
