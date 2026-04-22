'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Quiz, COURSE_SLUG } from '@/lib/course-data';
import { saveQuizScore, getBestScore } from '@/lib/quiz-progress';
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Trophy, RotateCcw, BookOpen, Clock,
} from 'lucide-react';

interface Props {
  quiz: Quiz | undefined;
}

export default function QuizContent({ quiz }: Props) {
  const basePath = `/courses/${COURSE_SLUG}`;

  // ─── Coming-soon state ────────────────────────────────────────────────────
  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] px-4 py-16 text-center">
        <Link
          href={basePath}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2CCEAC] transition-colors mb-10"
        >
          <ChevronLeft size={15} />
          Back to Course
        </Link>

        <div
          className="bg-white rounded-2xl border border-gray-200/80 p-10"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="w-16 h-16 bg-[#2CCEAC]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Clock size={28} className="text-[#2CCEAC]" />
          </div>
          <span className="inline-block bg-[#2CCEAC]/10 text-[#2CCEAC] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Coming Soon
          </span>
          <h1 className="text-2xl font-bold text-[#434343] mb-3">Pre-CBT Quiz</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            A comprehensive quiz covering all five topics will be available here shortly.
            Complete the lessons in the meantime to prepare.
          </p>
          <Link
            href={basePath}
            className="mt-8 inline-flex items-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Back to Learning
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // ─── Full quiz UI (rendered once questions exist) ─────────────────────────
  return <ActiveQuiz quiz={quiz} basePath={basePath} />;
}

function ActiveQuiz({ quiz, basePath }: { quiz: Quiz; basePath: string }) {
  const { questions, passingScore } = quiz;
  const QUIZ_KEY = COURSE_SLUG;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz');
  const [visible, setVisible] = useState(true);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  useEffect(() => {
    setBestScore(getBestScore(QUIZ_KEY));
  }, [QUIZ_KEY]);

  const selectedIndex = answers[questionIndex];
  const isAnswered = selectedIndex !== null;
  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const correctCount = answers.filter(
    (a, i) => a !== null && a === questions[i].correctAnswerIndex
  ).length;
  const scorePct = Math.round((correctCount / questions.length) * 100);
  const passed = scorePct >= passingScore;

  const LETTERS = 'ABCDEFGH'.split('');

  function handleSelectAnswer(index: number) {
    if (isAnswered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = index;
      return next;
    });
  }

  const goToResults = useCallback(() => {
    const prev = getBestScore(QUIZ_KEY);
    saveQuizScore(QUIZ_KEY, scorePct);
    if (prev === null || scorePct > prev) {
      setIsNewBest(true);
      setBestScore(scorePct);
    }
    setPhase('results');
  }, [QUIZ_KEY, scorePct]);

  function handleNext() {
    setVisible(false);
    setTimeout(() => {
      if (isLastQuestion) {
        goToResults();
      } else {
        setQuestionIndex((q) => q + 1);
      }
      setVisible(true);
    }, 180);
  }

  function handleRetake() {
    setVisible(false);
    setTimeout(() => {
      setAnswers(new Array(questions.length).fill(null));
      setQuestionIndex(0);
      setPhase('quiz');
      setIsNewBest(false);
      setVisible(true);
    }, 180);
  }

  function getButtonClass(optionIndex: number): string {
    const base =
      'relative w-full text-left flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-colors duration-200 focus:outline-none';
    if (!isAnswered) {
      return `${base} bg-white border-gray-200 text-gray-800 hover:border-[#2CCEAC]/60 hover:bg-[#2CCEAC]/5 active:scale-[0.98] cursor-pointer`;
    }
    if (optionIndex === currentQuestion.correctAnswerIndex) {
      return `${base} bg-[#2CCEAC]/10 border-[#2CCEAC] text-[#2CCEAC] cursor-default`;
    }
    if (optionIndex === selectedIndex) {
      return `${base} bg-red-50 border-red-400 text-red-600 cursor-default`;
    }
    return `${base} bg-white border-gray-100 text-gray-400 opacity-50 cursor-default`;
  }

  function getLetterClass(optionIndex: number): string {
    const base =
      'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200';
    if (!isAnswered) return `${base} bg-gray-100 text-gray-500`;
    if (optionIndex === currentQuestion.correctAnswerIndex) return `${base} bg-[#2CCEAC] text-white`;
    if (optionIndex === selectedIndex) return `${base} bg-red-400 text-white`;
    return `${base} bg-gray-100 text-gray-400`;
  }

  // ─── Results screen ──────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div className="mx-auto max-w-[600px] px-4 py-8">
        <div
          className="animate-fade-slide-up bg-white rounded-2xl border border-gray-200/80 overflow-hidden"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          <div className="px-6 py-8 text-center bg-[#434343]">
            <p className="text-[#2CCEAC] text-xs font-semibold uppercase tracking-wider mb-4">
              Pre-CBT Quiz · Results
            </p>
            <div
              className={`animate-score-reveal inline-flex items-center justify-center w-28 h-28 rounded-full text-4xl font-bold mb-3 ${
                passed ? 'bg-[#2CCEAC]/15 text-[#2CCEAC]' : 'bg-red-400/15 text-red-400'
              }`}
            >
              {scorePct}%
            </div>
            <p className="text-white font-semibold text-lg">
              {correctCount} of {questions.length} correct
            </p>
            {isNewBest && (
              <p className="text-[#2CCEAC] text-xs font-semibold mt-1 animate-fade-in">
                ★ New best score!
              </p>
            )}
          </div>

          <div className="px-6 py-6">
            {passed ? (
              <div className="flex items-start gap-3 bg-[#2CCEAC]/10 border border-[#2CCEAC]/25 rounded-xl p-4 mb-6 animate-fade-in">
                <Trophy size={22} className="flex-shrink-0 text-[#2CCEAC] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2CCEAC] leading-snug">
                    Nicely done — you passed!
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    You scored {scorePct}%, above the {passingScore}% pass mark.
                    {bestScore !== null && !isNewBest && bestScore > scorePct
                      ? ` Your best is still ${bestScore}%.`
                      : ''}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 animate-fade-in">
                <BookOpen size={22} className="flex-shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-700 leading-snug">
                    Not quite — you need {passingScore}% to pass
                  </p>
                  <p className="text-sm text-amber-600 mt-0.5">
                    You scored {scorePct}%. Review the lessons and have another go.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mb-6">
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const correct = userAnswer === q.correctAnswerIndex;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      correct ? 'bg-[#2CCEAC]/8 text-[#2CCEAC]' : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {correct ? (
                      <CheckCircle2 size={15} className="flex-shrink-0" />
                    ) : (
                      <XCircle size={15} className="flex-shrink-0" />
                    )}
                    <span className="truncate text-gray-700 font-medium">{q.questionText}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleRetake}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white font-semibold text-sm py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <RotateCcw size={16} />
                Retake Quiz
              </button>
              <Link
                href={basePath}
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm py-3 rounded-xl transition-colors duration-200"
              >
                <ChevronLeft size={16} />
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Quiz screen ─────────────────────────────────────────────────────────
  const progressPct = ((questionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-[600px] px-4 py-8">
      <Link
        href={basePath}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2CCEAC] transition-colors mb-6"
      >
        <ChevronLeft size={15} />
        Back to Course
      </Link>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-[#2CCEAC] uppercase tracking-wider">
            Pre-CBT Quiz
          </span>
          <span className="text-xs font-semibold text-gray-500 tabular-nums">
            {questionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #2CCEAC, #1fb896)',
            }}
          />
        </div>
        {bestScore !== null && (
          <p className="text-xs text-gray-400 mt-1.5">
            Best score: <span className="font-semibold text-gray-500">{bestScore}%</span>
          </p>
        )}
      </div>

      <div
        key={questionIndex}
        className="animate-fade-slide-up"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s' }}
      >
        <div
          className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden mb-4"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="px-6 py-6 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Question {questionIndex + 1}
            </p>
            {currentQuestion.image && (
              currentQuestion.image.startsWith('[IMAGE:') ? (
                <div className="mb-4 rounded-xl bg-gray-100 border border-gray-200 px-4 py-5 flex items-center justify-center text-center">
                  <p className="text-xs text-gray-400 italic">
                    {currentQuestion.image.slice(1, -1)}
                  </p>
                </div>
              ) : (
                <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentQuestion.image}
                    alt="Road sign"
                    className="max-h-40 object-contain"
                  />
                </div>
              )
            )}
            <h2 className="text-[17px] font-bold text-[#434343] leading-snug">
              {currentQuestion.questionText}
            </h2>
          </div>

          <div className="px-4 py-4 flex flex-col gap-2.5">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectAnswer(i)}
                disabled={isAnswered}
                className={getButtonClass(i)}
              >
                <span className={getLetterClass(i)}>
                  {isAnswered && i === currentQuestion.correctAnswerIndex ? (
                    <CheckCircle2 size={14} />
                  ) : isAnswered && i === selectedIndex && i !== currentQuestion.correctAnswerIndex ? (
                    <XCircle size={14} />
                  ) : (
                    LETTERS[i]
                  )}
                </span>
                <span className="flex-1 text-sm font-medium leading-snug">{option}</span>
                {isAnswered && i === currentQuestion.correctAnswerIndex && (
                  <CheckCircle2 size={18} className="flex-shrink-0 text-[#2CCEAC] animate-pop" />
                )}
                {isAnswered && i === selectedIndex && i !== currentQuestion.correctAnswerIndex && (
                  <XCircle size={18} className="flex-shrink-0 text-red-400 animate-pop" />
                )}
              </button>
            ))}
          </div>
        </div>

        {isAnswered && (
          <div
            className={`animate-fade-in rounded-xl px-5 py-4 mb-4 border ${
              selectedIndex === currentQuestion.correctAnswerIndex
                ? 'bg-[#2CCEAC]/8 border-[#2CCEAC]/20'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              selectedIndex === currentQuestion.correctAnswerIndex
                ? 'text-[#2CCEAC]'
                : 'text-amber-600'
            }`}>
              {selectedIndex === currentQuestion.correctAnswerIndex ? 'Correct!' : 'Not quite'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="animate-fade-in w-full inline-flex items-center justify-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
            <ChevronRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
