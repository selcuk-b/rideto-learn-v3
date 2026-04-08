import Link from "next/link";
import { notFound } from "next/navigation";
import { modules } from "@/lib/course-data";
import { ChevronLeft, Lock } from "lucide-react";

interface Props {
  params: { moduleId: string };
}

export default function ModulePage({ params }: Props) {
  const module = modules.find((m) => m.id === params.moduleId);
  if (!module) notFound();

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2CCEAC] transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Course
      </Link>

      {/* Module header */}
      <div className="bg-[#434343] rounded-xl px-6 py-8 mb-8 text-white">
        <p className="text-[#2CCEAC] text-xs font-semibold uppercase tracking-wider mb-2">
          Module {module.number}
        </p>
        <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-300 text-sm">{module.description}</p>
      </div>

      {/* Lessons list */}
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">
        Lessons
      </h2>
      <div className="flex flex-col gap-3">
        {module.lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700">{lesson.title}</span>
            <Lock size={15} className="text-gray-300 flex-shrink-0" />
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-400">
        Lessons coming soon — check back shortly.
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}
