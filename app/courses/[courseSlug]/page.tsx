import { notFound } from "next/navigation";
import { course } from "@/lib/course-data";
import CourseContent from "./course-content";

export const dynamic = 'force-dynamic';

interface Props {
  params: { courseSlug: string };
}

export function generateMetadata({ params }: Props) {
  if (params.courseSlug !== course.slug) return {};
  return {
    title: `${course.title} — RideTo Learn`,
    description: course.description,
  };
}

export default function CoursePage({ params }: Props) {
  if (params.courseSlug !== course.slug) notFound();
  return <CourseContent />;
}
