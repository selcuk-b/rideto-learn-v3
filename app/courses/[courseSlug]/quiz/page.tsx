import { notFound } from "next/navigation";
import { course } from "@/lib/course-data";
import QuizContent from "./quiz-content";

interface Props {
  params: { courseSlug: string };
}

export function generateStaticParams() {
  return [{ courseSlug: course.slug }];
}

export function generateMetadata({ params }: Props) {
  if (params.courseSlug !== course.slug) return {};
  return {
    title: `Pre-CBT Quiz — ${course.title} — RideTo Learn`,
    description: "Test your knowledge across all Pre-CBT topics.",
  };
}

export default function QuizPage({ params }: Props) {
  if (params.courseSlug !== course.slug) notFound();
  return <QuizContent quiz={course.quiz} />;
}
