'use client';

import { useEffect, useState } from 'react';
import ModuleAccordion from "@/components/ModuleAccordion";
import { course, modules, totalLessons, COURSE_SLUG } from "@/lib/course-data";
import { getCourseCompletedCount, getLessonCompletionMap, getNextIncompleteLesson } from "@/lib/progress";
import { getAllQuizScores } from "@/lib/quiz-progress";
import { Trophy, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CourseContent() {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [lessonMap, setLessonMap] = useState<Record<string, Record<string, boolean>>>({});
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [resumeTarget, setResumeTarget] = useState<{ moduleSlug: string; lessonSlug: string } | null>(null);

  useEffect(() => {
    setCompletedLessons(getCourseCompletedCount());
    setLessonMap(getLessonCompletionMap());
    setQuizScores(getAllQuizScores());
    setResumeTarget(getNextIncompleteLesson());
  }, []);

  const progressPct = Math.round((completedLessons / totalLessons) * 100);
  const isComplete = completedLessons === totalLessons && totalLessons > 0;

  return (
    <div className="mx-auto max-w-[800px] px-4">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mt-4 mb-2"
      >
        <ArrowLeft size={14} />
        All courses
      </Link>

      {/* Hero */}
      <section
        className="bg-[#434343] rounded-2xl px-6 pt-8 pb-10 mb-8 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <h1 className="text-2xl sm:text-[28px] font-bold leading-tight mb-2">
          {course.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-[480px]">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="font-semibold text-white">{modules.length}</span> modules
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="font-semibold text-white">{totalLessons}</span> lessons
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="font-semibold text-white">{course.estimatedTime}</span> total
          </div>
        </div>

        {/* Progress card */}
        <div className="bg-white/8 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                Your progress
              </p>
              <p className="text-sm font-semibold text-white">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isComplete && <Trophy size={16} className="text-[#2CCEAC]" />}
              <span className="text-3xl font-bold text-[#2CCEAC]">{progressPct}%</span>
            </div>
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
          {isComplete && (
            <p className="text-xs text-[#2CCEAC] mt-2 font-medium">
              Course complete! You&apos;re ready for your CBT.
            </p>
          )}
        </div>

        {/* Resume CTA */}
        {resumeTarget && !isComplete && completedLessons > 0 && (
          <Link
            href={`/courses/${COURSE_SLUG}/modules/${resumeTarget.moduleSlug}/lessons/${resumeTarget.lessonSlug}`}
            className="mt-4 inline-flex items-center gap-2 bg-[#2CCEAC] hover:bg-[#25b899] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Resume where you left off
            <ChevronRight size={15} />
          </Link>
        )}
      </section>

      {/* Course content — accordion modules */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Course Content
          </h2>
          <span className="text-xs text-gray-400">
            {modules.length} modules · {totalLessons} lessons
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {modules.map((module, index) => (
            <ModuleAccordion
              key={module.slug}
              module={module}
              lessonStatus={lessonMap[module.slug] ?? {}}
              quizScore={quizScores[module.slug] !== undefined ? quizScores[module.slug] : null}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
