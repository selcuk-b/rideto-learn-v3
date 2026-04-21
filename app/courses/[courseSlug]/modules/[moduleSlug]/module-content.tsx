'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Module, COURSE_SLUG } from "@/lib/course-data";
import { isLessonComplete, getModuleProgress } from "@/lib/progress";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, Trophy } from "lucide-react";

interface Props {
  courseModule: Module;
}

export default function ModuleContent({ courseModule }: Props) {
  const [lessonStatus, setLessonStatus] = useState<Record<string, boolean>>({});
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    const status: Record<string, boolean> = {};
    for (const lesson of courseModule.lessons) {
      status[lesson.slug] = isLessonComplete(courseModule.slug, lesson.slug);
    }
    setLessonStatus(status);
    setProgressPct(getModuleProgress(courseModule.slug));
  }, [courseModule]);

  const completedCount = Object.values(lessonStatus).filter(Boolean).length;
  const isModuleComplete = completedCount === courseModule.lessons.length;

  const nextLesson = courseModule.lessons.find((l) => !lessonStatus[l.slug]);
  const ctaLesson = nextLesson ?? courseModule.lessons[0];

  const basePath = `/courses/${COURSE_SLUG}/modules/${courseModule.slug}`;

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8">
      {/* Back */}
      <Link
        href={`/courses/${COURSE_SLUG}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2CCEAC] transition-colors mb-6"
      >
        <ChevronLeft size={15} />
        Back to Course
      </Link>

      {/* Module header */}
      <div
        className="bg-[#434343] rounded-xl px-6 py-8 mb-6 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[#2CCEAC] text-xs font-semibold uppercase tracking-wider mb-2">
              Subsection · {courseModule.lessons.length} {courseModule.lessons.length === 1 ? 'lesson' : 'lessons'}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
              {courseModule.title}
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              {courseModule.description}
            </p>
          </div>
          {isModuleComplete && (
            <div className="flex-shrink-0 w-10 h-10 bg-[#2CCEAC]/15 rounded-full flex items-center justify-center">
              <Trophy size={18} className="text-[#2CCEAC]" />
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">
              {completedCount} of {courseModule.lessons.length} completed
            </span>
            <span className="text-sm font-bold text-[#2CCEAC]">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #2CCEAC, #1fb896)",
              }}
            />
          </div>
          {isModuleComplete ? (
            <p className="text-xs text-[#2CCEAC] mt-2 font-medium">All lessons complete!</p>
          ) : (
            <Link
              href={`${basePath}/lessons/${ctaLesson.slug}`}
              className="mt-4 inline-flex items-center gap-2 bg-[#2CCEAC] hover:bg-[#25b899] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {completedCount === 0 ? "Start Module" : "Continue"}
              <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* Lessons list */}
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Lessons
      </h2>
      <div className="flex flex-col gap-2 mb-6">
        {courseModule.lessons.map((lesson, index) => {
          const done = lessonStatus[lesson.slug] ?? false;
          return (
            <Link
              key={lesson.slug}
              href={`${basePath}/lessons/${lesson.slug}`}
              className="group flex items-center gap-4 bg-white border border-gray-200/80 rounded-xl px-5 py-4 hover:border-[#2CCEAC]/50 hover:shadow-md transition-all duration-200"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? "bg-[#2CCEAC]/10 text-[#2CCEAC]"
                    : "bg-gray-100 text-gray-400 group-hover:bg-[#2CCEAC]/10 group-hover:text-[#2CCEAC]"
                }`}
              >
                {done ? <CheckCircle2 size={17} /> : <span>{index + 1}</span>}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold leading-snug transition-colors ${
                    done
                      ? "text-gray-400 line-through decoration-gray-300"
                      : "text-gray-800 group-hover:text-[#2CCEAC]"
                  }`}
                >
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock size={11} />
                  {lesson.estimatedReadTime} read
                </p>
              </div>

              {done ? (
                <span className="flex-shrink-0 text-xs text-[#2CCEAC] font-semibold bg-[#2CCEAC]/10 px-2 py-0.5 rounded-full">
                  Done
                </span>
              ) : (
                <ChevronRight
                  size={15}
                  className="flex-shrink-0 text-gray-300 group-hover:text-[#2CCEAC] group-hover:translate-x-0.5 transition-all"
                />
              )}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
