'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Module } from '@/lib/course-data';
import { saveQuizScore, getBestScore } from '@/lib/quiz-progress';
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Trophy, RotateCcw, BookOpen,
} from 'lucide-react';

interface Props {
  courseModule: Module;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function QuizContent({ courseModule }: Props) {
  const { quiz } = courseModule;
  const { questions } = quiz;

  const [questionIndex, setQuestionIndex] = useState(0);
  // Track each answer separately so we can compute score reliably
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz');
  const [visible, setVisible] = useState(true);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  useEffect(() => {
    setBestScore(getBestScore(courseModule.slug));
  }, [courseModule.slug]);

  const selectedIndex = answers[questionIndex];
  const isAnswered = selectedIndex !== null;
  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  // Derived score (always up-to-date with current answers state)
  const correctCount = answers.filter(
    (a, i) => a !== null && a === questions[i].correctIndex
  ).length;
  const scorePct = Math.round((correctCount / questions.length) * 100);
  const passed = scorePct >= 70;

  function handleSelectAnswer(index: number) {
    if (isAnswered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = index;
      return next;
    });
  }

  const goToResults = useCallback(() => {
    // scorePct is derived from current render's answers state
    const prev = getBestScore(courseModule.slug);
    saveQuizScore(courseModule.slug, scorePct);
    if (prev === null || scorePct > prev) {
      setIsNewBest(true);
      setBestScore(scorePct);
    }
    setPhase('results');
  }, [courseModule.slug, scorePct]);

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

  // ─── Answer button appearance ────────────────────────────────────────────
  function getButtonClass(optionIndex: number): string {
    const base =
      'relative w-full text-left flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-colors duration-200 focus:outline-none';

    if (!isAnswered) {
      return `${base} bg-white border-gray-200 text-gray-800 hover:border-[#2CCEAC]/60 hover:bg-[#2CCEAC]/5 active:scale-[0.98] cursor-pointer`;
    }
    if (optionIndex === currentQuestion.correctIndex) {
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
    if (optionIndex === currentQuestion.correctIndex) return `${base} bg-[#2CCEAC] text-white`;
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
          {/* Score header */}
          <div
            className={`px-6 py-8 text-center ${
              passed ? 'bg-[#434343]' : 'bg-[#434343]'
            }`}
          >
            <p className="text-[#2CCEAC] text-xs font-semibold uppercase tracking-wider mb-4">
              {courseModule.title} · Quiz Results
            </p>

            {/* Score circle */}
            <div
              className={`animate-score-reveal inline-flex items-center justify-center w-28 h-28 rounded-full text-4xl font-bold mb-3 ${
                passed
                  ? 'bg-[#2CCEAC]/15 text-[#2CCEAC]'
                  : 'bg-red-400/15 text-red-400'
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

          {/* Pass / fail message */}
          <div className="px-6 py-6">
            {passed ? (
              <div className="flex items-start gap-3 bg-[#2CCEAC]/10 border border-[#2CCEAC]/25 rounded-xl p-4 mb-6 animate-fade-in">
                <Trophy size={22} className="flex-shrink-0 text-[#2CCEAC] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2CCEAC] leading-snug">
                    Nicely done — you passed!
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    You scored {scorePct}%, which is above the 70% pass mark.
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
                    Not quite — you need 70% to pass
                  </p>
                  <p className="text-sm text-amber-600 mt-0.5">
                    You scored {scorePct}%. Review the lessons and have another go —
                    you&apos;re closer than you think.
                  </p>
                </div>
              </div>
            )}

            {/* Per-question review summary */}
            <div className="flex flex-col gap-2 mb-6">
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const correct = userAnswer === q.correctIndex;
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
                    <span className="truncate text-gray-700 font-medium">{q.question}</span>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRetake}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#434343] hover:bg-[#2CCEAC] text-white font-semibold text-sm py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <RotateCcw size={16} />
                Retake Quiz
              </button>
              <Link
                href={`/modules/${courseModule.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm py-3 rounded-xl transition-colors duration-200"
              >
                <ChevronLeft size={16} />
                Back to Module
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
      {/* Back link */}
      <Link
        href={`/modules/${courseModule.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2CCEAC] transition-colors mb-6"
      >
        <ChevronLeft size={15} />
        Back to Module
      </Link>

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-[#2CCEAC] uppercase tracking-wider">
            {courseModule.title} · Quiz
          </span>
          <span className="text-xs font-semibold text-gray-500 tabular-nums">
            {questionIndex + 1} / {questions.length}
          </span>
        </div>
        {/* Progress bar */}
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

      {/* Question card */}
      <div
        key={questionIndex}
        className="animate-fade-slide-up"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s' }}
      >
        <div
          className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden mb-4"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          {/* Question */}
          <div className="px-6 py-6 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Question {questionIndex + 1}
            </p>
            <h2 className="text-[17px] font-bold text-[#434343] leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="px-4 py-4 flex flex-col gap-2.5">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectAnswer(i)}
                disabled={isAnswered}
                className={getButtonClass(i)}
              >
                {/* Letter badge */}
                <span className={getLetterClass(i)}>
                  {isAnswered && i === currentQuestion.correctIndex ? (
                    <CheckCircle2 size={14} />
                  ) : isAnswered && i === selectedIndex && i !== currentQuestion.correctIndex ? (
                    <XCircle size={14} />
                  ) : (
                    LETTERS[i]
                  )}
                </span>

                {/* Option text */}
                <span className="flex-1 text-sm font-medium leading-snug">{option}</span>

                {/* Right-side icon */}
                {isAnswered && i === currentQuestion.correctIndex && (
                  <CheckCircle2
                    size={18}
                    className="flex-shrink-0 text-[#2CCEAC] animate-pop"
                  />
                )}
                {isAnswered && i === selectedIndex && i !== currentQuestion.correctIndex && (
                  <XCircle size={18} className="flex-shrink-0 text-red-400 animate-pop" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div
            className={`animate-fade-in rounded-xl px-5 py-4 mb-4 border ${
              selectedIndex === currentQuestion.correctIndex
                ? 'bg-[#2CCEAC]/8 border-[#2CCEAC]/20'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              selectedIndex === currentQuestion.correctIndex
                ? 'text-[#2CCEAC]'
                : 'text-amber-600'
            }`}>
              {selectedIndex === currentQuestion.correctIndex ? 'Correct!' : 'Not quite'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Next / Finish button */}
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
