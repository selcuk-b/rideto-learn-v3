import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/db";
import ModuleContent from "./module-content";

export const dynamic = 'force-dynamic';

interface Props {
  params: { courseSlug: string; moduleSlug: string };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  const mod = course?.modules.find((m) => m.slug === params.moduleSlug);
  if (!mod) return {};
  return {
    title: `${mod.title} — RideTo Learn`,
    description: mod.description,
  };
}

export default async function ModulePage({ params }: Props) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) notFound();
  const courseModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();
  return <ModuleContent courseModule={courseModule} />;
}
