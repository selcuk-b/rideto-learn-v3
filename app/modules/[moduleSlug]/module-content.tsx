'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Module } from "@/lib/course-data";
import { isLessonComplete, getModuleProgress } from "@/lib/progress";
import { getBestScore } from "@/lib/quiz-progress";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, Trophy, HelpCircle } from "lucide-react";

interface Props {
  courseModule: Module;
}

export default function ModuleContent({ courseModule }: Props) {
  const [lessonStatus, setLessonStatus] = useState<Record<string, boolean>>({});
  const [progressPct, setProgressPct] = useState(0);
  const [quizBestScore, setQuizBestScore] = useState<number | null>(null);

  useEffect(() => {
    const status: Record<string, boolean> = {};
    for (const lesson of courseModule.lessons) {
      status[lesson.slug] = isLessonComplete(courseModule.slug, lesson.slug);
    }
    setLessonStatus(status);
    setProgressPct(getModuleProgress(courseModule.slug));
    setQuizBestScore(getBestScore(courseModule.slug));
  }, [courseModule]);

  const completedCount = Object.values(lessonStatus).filter(Boolean).length;
  const isModuleComplete = completedCount === courseModule.lessons.length;

  const nextLesson = courseModule.lessons.find((l) => !lessonStatus[l.slug]);
  const ctaLesson = nextLesson ?? courseModule.lessons[0];

  const quizPassed = quizBestScore !== null && quizBestScore >= 70;

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8">
      {/* Back */}
      <Link
        href="/"
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
              Module {courseModule.number} · {courseModule.lessons.length} lessons
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
              href={`/modules/${courseModule.slug}/lessons/${ctaLesson.slug}`}
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
              href={`/modules/${courseModule.slug}/lessons/${lesson.slug}`}
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
                  {lesson.estimatedMinutes} min read
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

      {/* Quiz CTA */}
      <div
        className="bg-white border border-gray-200/80 rounded-xl p-5"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              quizPassed ? "bg-[#2CCEAC]/15 text-[#2CCEAC]" : "bg-gray-100 text-gray-500"
            }`}>
              {quizPassed ? <Trophy size={18} /> : <HelpCircle size={18} />}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#2CCEAC] uppercase tracking-wide mb-0.5">
                Module Quiz
              </p>
              <p className="text-[15px] font-semibold text-gray-800 leading-snug">
                Test your knowledge
              </p>
              {quizBestScore !== null ? (
                <p className="text-xs text-gray-500 mt-0.5">
                  Best score:{" "}
                  <span className={`font-semibold ${quizPassed ? "text-[#2CCEAC]" : "text-amber-500"}`}>
                    {quizBestScore}%
                  </span>
                  {quizPassed ? " · Passed ✓" : " — need 70% to pass"}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-0.5">
                  {courseModule.quiz.questions.length} questions · See how much you&apos;ve learned
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/modules/${courseModule.slug}/quiz`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200"
          >
            {quizBestScore !== null ? "Retake" : "Take Quiz"}
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
