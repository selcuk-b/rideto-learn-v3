import { modules as staticModules } from './course-data';

type LessonRef = { slug: string };
type ModuleRef = { slug: string; lessons: LessonRef[] };

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

export function getModuleProgress(moduleSlug: string, lessons?: LessonRef[]): number {
  const lessonList = lessons ?? staticModules.find((m) => m.slug === moduleSlug)?.lessons ?? [];
  if (!lessonList.length) return 0;
  const data = getProgress();
  const completed = lessonList.filter((l) => data[moduleSlug]?.[l.slug] === true).length;
  return Math.round((completed / lessonList.length) * 100);
}

export function getModuleCompletedCount(moduleSlug: string, lessons?: LessonRef[]): number {
  const lessonList = lessons ?? staticModules.find((m) => m.slug === moduleSlug)?.lessons ?? [];
  const data = getProgress();
  return lessonList.filter((l) => data[moduleSlug]?.[l.slug] === true).length;
}

export function getCourseProgress(moduleList?: ModuleRef[]): number {
  const mods = moduleList ?? staticModules;
  const data = getProgress();
  let total = 0;
  let completed = 0;
  for (const m of mods) {
    total += m.lessons.length;
    for (const l of m.lessons) {
      if (data[m.slug]?.[l.slug]) completed++;
    }
  }
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function getCourseCompletedCount(moduleList?: ModuleRef[]): number {
  const mods = moduleList ?? staticModules;
  const data = getProgress();
  let completed = 0;
  for (const m of mods) {
    for (const l of m.lessons) {
      if (data[m.slug]?.[l.slug]) completed++;
    }
  }
  return completed;
}

export function getLessonCompletionMap(moduleList?: ModuleRef[]): Record<string, Record<string, boolean>> {
  const mods = moduleList ?? staticModules;
  const data = getProgress();
  const result: Record<string, Record<string, boolean>> = {};
  for (const m of mods) {
    result[m.slug] = {};
    for (const l of m.lessons) {
      result[m.slug][l.slug] = data[m.slug]?.[l.slug] === true;
    }
  }
  return result;
}

export function getNextIncompleteLesson(moduleList?: ModuleRef[]): { moduleSlug: string; lessonSlug: string } | null {
  const mods = moduleList ?? staticModules;
  const data = getProgress();
  for (const m of mods) {
    for (const l of m.lessons) {
      if (!data[m.slug]?.[l.slug]) {
        return { moduleSlug: m.slug, lessonSlug: l.slug };
      }
    }
  }
  return null;
}
