'use client';

import { useEffect, useState } from 'react';
import ModuleAccordion from "@/components/ModuleAccordion";
import { course, modules, totalLessons, COURSE_SLUG } from "@/lib/course-data";
import { getCourseCompletedCount, getLessonCompletionMap } from "@/lib/progress";
import { getBestScore } from "@/lib/quiz-progress";
import { Trophy, ChevronRight, ArrowLeft, BookOpen, HelpCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function CourseContent() {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [lessonMap, setLessonMap] = useState<Record<string, Record<string, boolean>>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    setCompletedLessons(getCourseCompletedCount());
    setLessonMap(getLessonCompletionMap());
    setQuizScore(getBestScore(COURSE_SLUG));
  }, []);

  const progressPct = Math.round((completedLessons / totalLessons) * 100);
  const allLessonsComplete = completedLessons === totalLessons && totalLessons > 0;
  const hasQuiz = course.quiz != null && course.quiz.questions.length > 0;
  const quizPassed = hasQuiz && quizScore !== null && course.quiz != null && quizScore >= course.quiz.passingScore;

  return (
    <div className="mx-auto max-w-[800px] px-4 pb-12">
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
        className="bg-[#434343] rounded-2xl px-6 pt-8 pb-8 mb-8 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <h1 className="font-heading text-type-h3 uppercase mb-2">
          {course.title}
        </h1>
        <p className="font-body text-type-body text-gray-300 mb-6 max-w-[480px]">
          {course.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-body text-type-small text-gray-400">
            <span className="font-bold text-white">{modules.length}</span> subsections
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 font-body text-type-small text-gray-400">
            <span className="font-bold text-white">{totalLessons}</span> lessons
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 font-body text-type-small text-gray-400">
            <span className="font-bold text-white">{course.estimatedTime}</span> total
          </div>
        </div>
      </section>

      {/* ── SECTION 1: Learning ─────────────────────────────────────────── */}
      <section className="mb-8">
        <p className="font-body text-type-tag font-bold text-gray-400 uppercase tracking-[0.06em] mb-1 px-1">
          Section 1
        </p>
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-[#434343]" />
            <h2 className="font-heading text-type-h5 uppercase text-[#434343]">Learning</h2>
          </div>
          <span className="font-body text-type-caption text-gray-400">
            {completedLessons} / {totalLessons} lessons
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-5 px-1">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #2CCEAC, #1fb896)",
              }}
            />
          </div>
          {allLessonsComplete && (
            <p className="text-xs text-[#2CCEAC] mt-1.5 font-medium flex items-center gap-1">
              <Trophy size={12} />
              All lessons complete!
            </p>
          )}
        </div>

        {/* Subsection accordions */}
        <div className="flex flex-col gap-3">
          {modules.map((module, index) => (
            <div key={module.slug}>
              <ModuleAccordion
                module={module}
                lessonStatus={lessonMap[module.slug] ?? {}}
                quizScore={null}
                showQuiz={false}
                defaultOpen={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: Pre-CBT Quiz ──────────────────────────────────────── */}
      <section>
        <p className="font-body text-type-tag font-bold text-gray-400 uppercase tracking-[0.06em] mb-1 px-1">
          Section 2
        </p>
        <div className="flex items-center gap-2 mb-4 px-1">
          <HelpCircle size={18} className="text-[#434343]" />
          <h2 className="font-heading text-type-h5 uppercase text-[#434343]">Pre-CBT Quiz</h2>
        </div>

        <div
          className="bg-white border border-gray-200/80 rounded-xl p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          {hasQuiz ? (
            /* Quiz available */
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  quizPassed ? "bg-[#2CCEAC]/15 text-[#2CCEAC]" : "bg-gray-100 text-gray-500"
                }`}>
                  {quizPassed ? <Trophy size={18} /> : <HelpCircle size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-type-h6 uppercase text-gray-800">
                    Pre-CBT Quiz
                  </p>
                  {quizScore !== null ? (
                    <p className="font-body text-type-caption text-gray-500 mt-0.5">
                      Best score:{" "}
                      <span className={`font-bold ${quizPassed ? "text-[#2CCEAC]" : "text-amber-500"}`}>
                        {quizScore}%
                      </span>
                      {quizPassed ? " · Passed ✓" : ` — need ${course.quiz!.passingScore}% to pass`}
                    </p>
                  ) : (
                    <p className="font-body text-type-caption text-gray-500 mt-0.5">
                      {course.quiz!.questions.length} questions · Test your knowledge across all topics
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={`/courses/${COURSE_SLUG}/quiz`}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white font-heading text-type-button uppercase tracking-[0.05em] px-4 py-2.5 rounded-lg transition-colors duration-200"
              >
                {quizScore !== null ? "Retake" : "Start Quiz"}
                <ChevronRight size={15} />
              </Link>
            </div>
          ) : (
            /* Coming soon */
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400">
                  <Clock size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[15px] font-semibold text-gray-800 leading-snug">
                      Pre-CBT Quiz
                    </p>
                    <span className="text-[10px] font-bold bg-[#2CCEAC]/10 text-[#2CCEAC] uppercase tracking-widest px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    A comprehensive quiz covering all five topics — questions arriving soon.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
