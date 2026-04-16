const QUIZ_KEY = 'rideto-quiz-scores';
const QUIZ_MIGRATION_KEY = 'rideto-quiz-migrated-v2';

type QuizScores = Record<string, number>; // moduleSlug → best score percentage (0–100)

function migrateQuizData(scores: QuizScores): QuizScores {
  // Rename "confidence" -> "common-mistakes" (module slug changed in PRD v3)
  if (scores["confidence"] !== undefined) {
    if (scores["common-mistakes"] === undefined || scores["confidence"] > scores["common-mistakes"]) {
      scores["common-mistakes"] = scores["confidence"];
    }
    delete scores["confidence"];
  }
  return scores;
}

function getScores(): QuizScores {
  if (typeof window === 'undefined') return {};
  try {
    let scores: QuizScores = JSON.parse(localStorage.getItem(QUIZ_KEY) || '{}');

    if (!localStorage.getItem(QUIZ_MIGRATION_KEY)) {
      scores = migrateQuizData(scores);
      localStorage.setItem(QUIZ_KEY, JSON.stringify(scores));
      localStorage.setItem(QUIZ_MIGRATION_KEY, '1');
    }

    return scores;
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
