'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Module } from "@/lib/course-data";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, BookOpen } from "lucide-react";

interface Props {
  courseModule: Module;
  lessonIndex: number;
}

export default function LessonContent({ courseModule, lessonIndex }: Props) {
  const lesson = courseModule.lessons[lessonIndex];
  const totalLessons = courseModule.lessons.length;
  const prevLesson = lessonIndex > 0 ? courseModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < totalLessons - 1 ? courseModule.lessons[lessonIndex + 1] : null;
  const progressPct = ((lessonIndex + 1) / totalLessons) * 100;

  const [completed, setCompleted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isLessonComplete(courseModule.slug, lesson.slug));
  }, [courseModule.slug, lesson.slug]);

  function handleMarkComplete() {
    markLessonComplete(courseModule.slug, lesson.slug);
    setCompleted(true);
    setJustCompleted(true);
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
        <Link href="/" className="text-gray-400 hover:text-[#2CCEAC] transition-colors">
          Course
        </Link>
        <ChevronRight size={13} className="text-gray-300" />
        <Link
          href={`/modules/${courseModule.slug}`}
          className="text-gray-400 hover:text-[#2CCEAC] transition-colors truncate max-w-[160px] sm:max-w-none"
        >
          {courseModule.title}
        </Link>
        <ChevronRight size={13} className="text-gray-300" />
        <span className="text-gray-600 font-medium">Lesson {lessonIndex + 1}</span>
      </nav>

      {/* Lesson card */}
      <div
        className="bg-white rounded-xl border border-gray-200/80 overflow-hidden mb-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-xs text-gray-400">
            <span className="font-semibold text-[#2CCEAC] uppercase tracking-wide">
              Module {courseModule.number}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              Lesson {lessonIndex + 1} of {totalLessons}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {lesson.estimatedMinutes} min read
            </span>
            {completed && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#2CCEAC] font-medium">
                  <CheckCircle2 size={12} />
                  Completed
                </span>
              </>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#434343] leading-tight">
            {lesson.title}
          </h1>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-gray-400">Module progress</span>
              <span className="text-xs font-semibold text-gray-500">
                {lessonIndex + 1}/{totalLessons}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #2CCEAC, #1fb896)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <article>
            {lesson.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-gray-700 leading-[1.8] text-[15px] mb-5 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>

        {/* Mark complete footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
          {completed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2CCEAC]/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={18} className="text-[#2CCEAC]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2CCEAC]">
                  {justCompleted ? "Marked as complete!" : "Lesson completed"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {nextLesson
                    ? "Continue to the next lesson below."
                    : "You've finished this module."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                Finished reading? Mark this lesson as complete.
              </p>
              <button
                onClick={handleMarkComplete}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2CCEAC] hover:bg-[#25b899] active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                Mark Complete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-stretch justify-between gap-3">
        {/* Previous */}
        {prevLesson ? (
          <Link
            href={`/modules/${courseModule.slug}/lessons/${prevLesson.slug}`}
            className="group flex items-center gap-2 bg-white border border-gray-200/80 rounded-xl px-4 py-3 hover:border-gray-300 transition-all duration-200 min-w-0 flex-1 max-w-[48%]"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <ChevronLeft
              size={16}
              className="flex-shrink-0 text-gray-400 group-hover:text-[#434343] group-hover:-translate-x-0.5 transition-all"
            />
            <div className="min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Previous</p>
              <p className="text-sm font-semibold text-gray-700 group-hover:text-[#434343] truncate">
                {prevLesson.title}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href={`/modules/${courseModule.slug}`}
            className="group flex items-center gap-2 bg-white border border-gray-200/80 rounded-xl px-4 py-3 hover:border-gray-300 transition-all duration-200"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <ChevronLeft
              size={16}
              className="flex-shrink-0 text-gray-400 group-hover:-translate-x-0.5 transition-transform"
            />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Back to</p>
              <p className="text-sm font-semibold text-gray-700">Module overview</p>
            </div>
          </Link>
        )}

        {/* Next */}
        {nextLesson ? (
          <Link
            href={`/modules/${courseModule.slug}/lessons/${nextLesson.slug}`}
            className="group flex items-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] rounded-xl px-4 py-3 transition-all duration-200 min-w-0 flex-1 max-w-[48%] justify-end text-right"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <div className="min-w-0">
              <p className="text-xs text-gray-400 group-hover:text-white/70 mb-0.5 transition-colors">
                Next
              </p>
              <p className="text-sm font-semibold text-white truncate">
                {nextLesson.title}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="flex-shrink-0 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ) : (
          <Link
            href={`/modules/${courseModule.slug}`}
            className="group flex items-center gap-2 bg-[#2CCEAC] hover:bg-[#25b899] rounded-xl px-5 py-3 transition-all duration-200 justify-end"
            style={{ boxShadow: "0 1px 3px rgba(44,206,172,0.3)" }}
          >
            <div className="text-right">
              <p className="text-xs text-white/70 mb-0.5">You&apos;re done!</p>
              <p className="text-sm font-bold text-white">Module Complete</p>
            </div>
            <ChevronRight
              size={16}
              className="flex-shrink-0 text-white/80 group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
