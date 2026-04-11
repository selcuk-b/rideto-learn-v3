import { modules } from './course-data';

const STORAGE_KEY = 'rideto-learn-progress';

type ProgressData = Record<string, Record<string, boolean>>;

function getProgress(): ProgressData {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markLessonComplete(moduleSlug: string, lessonSlug: string): void {
  const data = getProgress();
  if (!data[moduleSlug]) data[moduleSlug] = {};
  data[moduleSlug][lessonSlug] = true;
  saveProgress(data);
}

export function isLessonComplete(moduleSlug: string, lessonSlug: string): boolean {
  const data = getProgress();
  return data[moduleSlug]?.[lessonSlug] === true;
}

export function getModuleProgress(moduleSlug: string): number {
  const courseModule = modules.find((m) => m.slug === moduleSlug);
  if (!courseModule) return 0;
  const data = getProgress();
  const completed = courseModule.lessons.filter(
    (l) => data[moduleSlug]?.[l.slug] === true
  ).length;
  return courseModule.lessons.length > 0
    ? Math.round((completed / courseModule.lessons.length) * 100)
    : 0;
}

export function getModuleCompletedCount(moduleSlug: string): number {
  const courseModule = modules.find((m) => m.slug === moduleSlug);
  if (!courseModule) return 0;
  const data = getProgress();
  return courseModule.lessons.filter((l) => data[moduleSlug]?.[l.slug] === true).length;
}

export function getCourseProgress(): number {
  const data = getProgress();
  let total = 0;
  let completed = 0;
  for (const courseModule of modules) {
    total += courseModule.lessons.length;
    for (const lesson of courseModule.lessons) {
      if (data[courseModule.slug]?.[lesson.slug]) completed++;
    }
  }
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function getCourseCompletedCount(): number {
  const data = getProgress();
  let completed = 0;
  for (const courseModule of modules) {
    for (const lesson of courseModule.lessons) {
      if (data[courseModule.slug]?.[lesson.slug]) completed++;
    }
  }
  return completed;
}
