import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/db";
import LessonContent from "./lesson-content";

export const dynamic = 'force-dynamic';

interface Props {
  params: { courseSlug: string; moduleSlug: string; lessonSlug: string };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  const mod = course?.modules.find((m) => m.slug === params.moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === params.lessonSlug);
  if (!mod || !lesson) return {};
  return {
    title: `${lesson.title} — ${mod.title} — RideTo Learn`,
    description: lesson.keyTakeaway,
  };
}

export default async function LessonPage({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) notFound();
  const courseModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();

  const lessonIndex = courseModule.lessons.findIndex(
    (l) => l.slug === params.lessonSlug
  );
  if (lessonIndex === -1) notFound();

  return <LessonContent courseModule={courseModule} lessonIndex={lessonIndex} />;
}
