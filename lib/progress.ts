import { modules } from './course-data';

const STORAGE_KEY = 'rideto-learn-progress';
const MIGRATION_KEY = 'rideto-learn-progress-migrated-v2';

type ProgressData = Record<string, Record<string, boolean>>;

function migrateProgressData(data: ProgressData): ProgressData {
  // Rename "confidence" -> "common-mistakes" (module slug changed in PRD v3)
  if (data["confidence"]) {
    data["common-mistakes"] = { ...data["confidence"], ...data["common-mistakes"] };
    delete data["confidence"];
  }
  return data;
}

function getProgress(): ProgressData {
  if (typeof window === 'undefined') return {};
  try {
    let data: ProgressData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    // One-time migration
    if (!localStorage.getItem(MIGRATION_KEY)) {
      data = migrateProgressData(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(MIGRATION_KEY, '1');
    }

    return data;
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

export function getLessonCompletionMap(): Record<string, Record<string, boolean>> {
  const data = getProgress();
  const result: Record<string, Record<string, boolean>> = {};
  for (const courseModule of modules) {
    result[courseModule.slug] = {};
    for (const lesson of courseModule.lessons) {
      result[courseModule.slug][lesson.slug] = data[courseModule.slug]?.[lesson.slug] === true;
    }
  }
  return result;
}

export function getNextIncompleteLesson(): { moduleSlug: string; lessonSlug: string } | null {
  const data = getProgress();
  for (const courseModule of modules) {
    for (const lesson of courseModule.lessons) {
      if (!data[courseModule.slug]?.[lesson.slug]) {
        return { moduleSlug: courseModule.slug, lessonSlug: lesson.slug };
      }
    }
  }
  return null;
}
