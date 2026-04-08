import Link from "next/link";
import { MapPin, ClipboardList, CheckSquare, Star, ChevronRight } from "lucide-react";
import { Module } from "@/lib/course-data";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={22} strokeWidth={1.75} />,
  ClipboardList: <ClipboardList size={22} strokeWidth={1.75} />,
  CheckSquare: <CheckSquare size={22} strokeWidth={1.75} />,
  Star: <Star size={22} strokeWidth={1.75} />,
};

interface ModuleCardProps {
  module: Module;
  completedLessons?: number;
}

export default function ModuleCard({ module, completedLessons = 0 }: ModuleCardProps) {
  const total = module.lessons.length;
  const progressPct = total > 0 ? Math.round((completedLessons / total) * 100) : 0;

  return (
    <Link
      href={`/modules/${module.id}`}
      className="group block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-[#2CCEAC] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Icon badge */}
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#2CCEAC]/10 text-[#2CCEAC] flex items-center justify-center">
          {iconMap[module.icon]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#2CCEAC] uppercase tracking-wide">
              Module {module.number}
            </span>
            <span className="text-xs text-gray-400">{total} lessons</span>
          </div>

          <h2 className="mt-0.5 text-base font-semibold text-gray-800 group-hover:text-[#2CCEAC] transition-colors leading-snug">
            {module.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {module.description}
          </p>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">
                {completedLessons} of {total} completed
              </span>
              <span className="text-xs font-medium text-gray-500">{progressPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2CCEAC] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={18}
          className="flex-shrink-0 text-gray-300 group-hover:text-[#2CCEAC] transition-colors mt-1"
        />
      </div>
    </Link>
  );
}
