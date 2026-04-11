import { notFound } from "next/navigation";
import { modules } from "@/lib/course-data";
import LessonContent from "./lesson-content";

interface Props {
  params: { moduleSlug: string; lessonSlug: string };
}

export default function LessonPage({ params }: Props) {
  const courseModule = modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();

  const lessonIndex = courseModule.lessons.findIndex((l) => l.slug === params.lessonSlug);
  if (lessonIndex === -1) notFound();

  return (
    <LessonContent
      courseModule={courseModule}
      lessonIndex={lessonIndex}
    />
  );
}
