'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Module, COURSE_SLUG } from '@/lib/course-data';
import {
  ChevronDown, Clock, CheckCircle2, HelpCircle, Trophy,
  MapPin, TriangleAlert, ClipboardList, ShieldAlert, CheckSquare,
  PlayCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={18} strokeWidth={1.75} />,
  TriangleAlert: <TriangleAlert size={18} strokeWidth={1.75} />,
  ClipboardList: <ClipboardList size={18} strokeWidth={1.75} />,
  ShieldAlert: <ShieldAlert size={18} strokeWidth={1.75} />,
  CheckSquare: <CheckSquare size={18} strokeWidth={1.75} />,
};

interface ModuleAccordionProps {
  module: Module;
  lessonStatus: Record<string, boolean>;
  quizScore: number | null;
  defaultOpen?: boolean;
  showQuiz?: boolean;
}

export default function ModuleAccordion({
  module,
  lessonStatus,
  quizScore,
  defaultOpen = false,
  showQuiz = true,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const total = module.lessons.length;
  const completedCount = module.lessons.filter((l) => lessonStatus[l.slug]).length;
  const isModuleComplete = completedCount === total && total > 0;
  const quizPassed = quizScore !== null && module.quiz != null && quizScore >= module.quiz.passingScore;

  const basePath = `/courses/${COURSE_SLUG}/modules/${module.slug}`;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200/80 overflow-hidden transition-shadow duration-200 hover:shadow-md"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        borderLeft: isModuleComplete
          ? '3px solid #2CCEAC'
          : completedCount > 0
            ? '3px solid #2CCEAC80'
            : '3px solid #e5e7eb',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
      >
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
            isModuleComplete
              ? 'bg-[#2CCEAC]/15 text-[#2CCEAC]'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {module.icon ? iconMap[module.icon] : null}
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold text-gray-800 leading-snug">
            {showQuiz && (
              <span className="text-[#2CCEAC] text-xs font-semibold uppercase tracking-wide mr-2">
                Module {module.order}:
              </span>
            )}
            {module.title}
          </h2>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span>
              {completedCount} / {total}
              {isModuleComplete && (
                <span className="text-[#2CCEAC] font-medium ml-1">✓</span>
              )}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {module.estimatedTime}
            </span>
            {showQuiz && quizScore !== null && (
              <>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span className={`font-semibold ${quizPassed ? 'text-[#2CCEAC]' : 'text-amber-500'}`}>
                  Quiz: {quizScore}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable body */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="border-t border-gray-100">
          {/* Lesson list */}
          {module.lessons.map((lesson, index) => {
            const done = lessonStatus[lesson.slug] ?? false;
            return (
              <Link
                key={lesson.slug}
                href={`${basePath}/lessons/${lesson.slug}`}
                className="group flex items-center gap-3 px-5 py-3 hover:bg-[#2CCEAC]/5 transition-colors border-b border-gray-50 last:border-b-0"
              >
                {/* Checkbox / number */}
                <div className="flex-shrink-0">
                  {done ? (
                    <CheckCircle2 size={18} className="text-[#2CCEAC]" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-400">{index + 1}</span>
                    </div>
                  )}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-snug transition-colors ${
                      done
                        ? 'text-gray-400 line-through decoration-gray-300'
                        : 'text-gray-700 group-hover:text-[#2CCEAC] font-medium'
                    }`}
                  >
                    {lesson.title}
                  </p>
                </div>

                {/* Time */}
                <span className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400">
                  <PlayCircle size={11} />
                  {lesson.estimatedReadTime}
                </span>
              </Link>
            );
          })}

          {/* Quiz row */}
          {showQuiz && module.quiz && (
            <Link
              href={`${basePath}/quiz`}
              className="group flex items-center gap-3 px-5 py-3 bg-gray-50/50 hover:bg-[#2CCEAC]/5 transition-colors"
            >
              <div className="flex-shrink-0">
                {quizPassed ? (
                  <Trophy size={18} className="text-[#2CCEAC]" />
                ) : (
                  <HelpCircle size={18} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-snug ${quizPassed ? 'text-[#2CCEAC]' : 'text-gray-700 group-hover:text-[#2CCEAC]'}`}>
                  {module.quiz.title}
                </p>
              </div>
              <span className="flex-shrink-0 text-xs text-gray-400">
                {module.quiz.questions.length} questions
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
