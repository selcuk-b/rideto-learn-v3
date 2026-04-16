import { notFound } from "next/navigation";
import { course } from "@/lib/course-data";
import ModuleContent from "./module-content";

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
    title: `${mod.title} — RideTo Learn`,
    description: mod.description,
  };
}

export default function ModulePage({ params }: Props) {
  if (params.courseSlug !== course.slug) notFound();
  const courseModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();
  return <ModuleContent courseModule={courseModule} />;
}
