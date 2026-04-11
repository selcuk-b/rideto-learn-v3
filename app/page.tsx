'use client';

import { useEffect, useState } from 'react';
import ModuleCard from "@/components/ModuleCard";
import { modules, totalLessons } from "@/lib/course-data";
import { getCourseCompletedCount, getModuleCompletedCount } from "@/lib/progress";
import { getAllQuizScores } from "@/lib/quiz-progress";
import { BookOpen, Trophy } from "lucide-react";

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [moduleCompletions, setModuleCompletions] = useState<Record<string, number>>({});
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  useEffect(() => {
    setCompletedLessons(getCourseCompletedCount());
    const counts: Record<string, number> = {};
    for (const m of modules) {
      counts[m.slug] = getModuleCompletedCount(m.slug);
    }
    setModuleCompletions(counts);
    setQuizScores(getAllQuizScores());
  }, []);

  const progressPct = Math.round((completedLessons / totalLessons) * 100);
  const isComplete = completedLessons === totalLessons && totalLessons > 0;

  return (
    <div className="mx-auto max-w-[800px] px-4">
      {/* Hero */}
      <section
        className="bg-[#434343] rounded-b-2xl px-6 pt-8 pb-10 mb-8 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <div className="inline-flex items-center gap-1.5 bg-[#2CCEAC]/15 text-[#2CCEAC] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
          <BookOpen size={12} strokeWidth={2} />
          Free Course
        </div>

        <h1 className="text-2xl sm:text-[28px] font-bold leading-tight mb-2">
          CBT Preparation Course
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-[480px]">
          Everything you need to know before your motorcycle training day — from Highway Code essentials to what to pack.
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
            <span className="font-semibold text-white">~45</span> min total
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
      </section>

      {/* Modules */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Course Modules
          </h2>
          <span className="text-xs text-gray-400">{modules.length} modules</span>
        </div>
        <div className="flex flex-col gap-3">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.slug}
              module={module}
              completedLessons={moduleCompletions[module.slug] ?? 0}
              quizScore={quizScores[module.slug] !== undefined ? quizScores[module.slug] : null}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
