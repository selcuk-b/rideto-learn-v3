import ModuleCard from "@/components/ModuleCard";
import { modules, totalLessons } from "@/lib/course-data";
import { BookOpen } from "lucide-react";

const completedLessons = 0;

export default function Home() {
  return (
    <div className="mx-auto max-w-[800px] px-4">
      {/* Hero */}
      <section className="bg-[#434343] rounded-b-2xl px-6 py-10 mb-8 text-white">
        <div className="flex items-start gap-3 mb-3">
          <div className="mt-0.5 w-9 h-9 rounded-lg bg-[#2CCEAC]/20 text-[#2CCEAC] flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-[#2CCEAC] text-sm font-semibold uppercase tracking-wider mb-1">
              Free Course
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              CBT Preparation Course
            </h1>
          </div>
        </div>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-3 mb-6">
          Everything you need to know before your motorcycle training day.
        </p>

        {/* Progress summary */}
        <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-300 mb-0.5">Your progress</p>
            <p className="text-sm font-semibold text-white">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#2CCEAC]">
              {Math.round((completedLessons / totalLessons) * 100)}%
            </span>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2CCEAC] rounded-full transition-all duration-500"
            style={{ width: `${Math.round((completedLessons / totalLessons) * 100)}%` }}
          />
        </div>
      </section>

      {/* Modules */}
      <section className="pb-10">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">
          Course Modules
        </h2>
        <div className="flex flex-col gap-4">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} completedLessons={0} />
          ))}
        </div>
      </section>
    </div>
  );
}
