import { notFound } from "next/navigation";
import { modules } from "@/lib/course-data";
import QuizContent from "./quiz-content";

interface Props {
  params: { moduleSlug: string };
}

export default function QuizPage({ params }: Props) {
  const courseModule = modules.find((m) => m.slug === params.moduleSlug);
  if (!courseModule) notFound();
  return <QuizContent courseModule={courseModule} />;
}
