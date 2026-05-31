import { getAllPublishedCourses } from "@/lib/db";
import HomeContent from "./home-content";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dbCourses = await getAllPublishedCourses();
  return <HomeContent dbCourses={dbCourses} />;
}
