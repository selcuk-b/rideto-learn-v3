import { notFound } from "next/navigation";
import { course } from "@/lib/course-data";
import LessonContent from "./lesson-content";

interface Props {
  params: { courseSlug: string; moduleSlug: string; lessonSlug: string };
}

export function generateStaticParams() {
  const params: { courseSlug: string; moduleSlug: string; lessonSlug: string }[] = [];
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      params.push({
        courseSlug: course.slug,
        moduleSlug: mod.slug,
        lessonSlug: lesson.slug,
      });
    }
  }
  return params;
}

export function generateMetadata({ params }: Props) {
  const mod = course.modules.find((m) => m.slug === params.moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === params.lessonSlug);
  if (!mod || !lesson) return {};
  return {
    title: `${lesson.title} — ${mod.title} — RideTo Learn`,
    description: lesson.keyTakeaway,
  };
}

export default function LessonPage({ params }: Props) {
  if (params.courseSlug !== course.slug) notFound();
  const courseModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();

  const lessonIndex = courseModule.lessons.findIndex(
    (l) => l.slug === params.lessonSlug
  );
  if (lessonIndex === -1) notFound();

  return <LessonContent courseModule={courseModule} lessonIndex={lessonIndex} />;
}
