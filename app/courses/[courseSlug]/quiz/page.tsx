import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/db";
import QuizContent from "./quiz-content";

export const dynamic = 'force-dynamic';

interface Props {
  params: { courseSlug: string };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) return {};
  return {
    title: `Pre-CBT Quiz — ${course.title} — RideTo Learn`,
    description: "Test your knowledge across all Pre-CBT topics.",
  };
}

export default async function QuizPage({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) notFound();
  return <QuizContent quiz={course.quiz} />;
}
