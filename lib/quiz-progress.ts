const QUIZ_KEY = 'rideto-quiz-scores';

type QuizScores = Record<string, number>; // moduleSlug → best score percentage (0–100)

function getScores(): QuizScores {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(QUIZ_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveQuizScore(moduleSlug: string, scorePct: number): void {
  if (typeof window === 'undefined') return;
  const scores = getScores();
  if (scores[moduleSlug] === undefined || scorePct > scores[moduleSlug]) {
    scores[moduleSlug] = scorePct;
    localStorage.setItem(QUIZ_KEY, JSON.stringify(scores));
  }
}

export function getBestScore(moduleSlug: string): number | null {
  const scores = getScores();
  return scores[moduleSlug] !== undefined ? scores[moduleSlug] : null;
}

export function getAllQuizScores(): QuizScores {
  return getScores();
}
