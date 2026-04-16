import { notFound } from "next/navigation";
import { course } from "@/lib/course-data";
import QuizContent from "./quiz-content";

interface Props {
  params: { courseSlug: string; moduleSlug: string };
}

export function generateStaticParams() {
  return course.modules.map((m) => ({
    courseSlug: course.slug,
    moduleSlug: m.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const mod = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!mod) return {};
  return {
    title: `${mod.quiz.title} — RideTo Learn`,
    description: mod.quiz.description,
  };
}

export default function QuizPage({ params }: Props) {
  if (params.courseSlug !== course.slug) notFound();
  const courseModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();
  return <QuizContent courseModule={courseModule} />;
}
