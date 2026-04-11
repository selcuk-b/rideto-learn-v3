import { notFound } from "next/navigation";
import { modules } from "@/lib/course-data";
import ModuleContent from "./module-content";

interface Props {
  params: { moduleSlug: string };
}

export default function ModulePage({ params }: Props) {
  const courseModule = modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();
  return <ModuleContent courseModule={courseModule} />;
}
