import { notFound } from "next/navigation";
import { course, catalogue } from "@/lib/course-data";
import CourseContent from "./course-content";

interface Props {
  params: { courseSlug: string };
}

export function generateStaticParams() {
  // Only generate pages for active courses
  return catalogue
    .filter((c) => !c.comingSoon)
    .map((c) => ({ courseSlug: c.slug }));
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
