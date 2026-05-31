import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/db";
import CourseContent from "./course-content";

export const dynamic = 'force-dynamic';

interface Props {
  params: { courseSlug: string };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) return {};
  return {
    title: `${course.title} — RideTo Learn`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) notFound();
  return <CourseContent course={course} />;
}
