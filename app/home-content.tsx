'use client';

import { useEffect, useState } from 'react';
import CourseCard from "@/components/CourseCard";
import { catalogue, type CatalogueCourse, type Course } from "@/lib/course-data";
import { getCourseCompletedCount } from "@/lib/progress";

interface Props {
  dbCourses: Course[];
}

/** Map a DB course to CatalogueCourse shape for CourseCard.
 *  Uses rich metadata from static catalogue for known courses,
 *  falls back to sensible defaults for new courses created in admin. */
function toCard(course: Course): CatalogueCourse {
  const staticEntry = catalogue.find((c) => c.slug === course.slug);
  return {
    slug: course.slug,
    title: course.title,
    description: course.description,
    tagline: staticEntry?.tagline ?? course.description,
    stage: staticEntry?.stage ?? course.trainingType.toUpperCase(),
    phase: staticEntry?.phase ?? 'V2',
    moduleCount: course.modules.length,
    comingSoon: false,
    icon: staticEntry?.icon ?? 'Bike',
  };
}

export default function HomeContent({ dbCourses }: Props) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    // Pass live module data from DB so progress is accurate
    const allModules = dbCourses.flatMap((c) => c.modules);
    setCompleted(getCourseCompletedCount(allModules));
  }, [dbCourses]);

  // DB published courses → Available Now
  const activeCourses = dbCourses.map(toCard);

  // Static coming-soon courses that aren't yet in the DB
  const dbSlugs = new Set(dbCourses.map((c) => c.slug));
  const comingSoonCourses = catalogue.filter((c) => c.comingSoon && !dbSlugs.has(c.slug));

  const totalLessons = dbCourses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );

  return (
    <div className="mx-auto max-w-[800px] px-4">
      {/* Hero */}
      <section
        className="bg-[#434343] rounded-b-2xl px-6 pt-8 pb-10 mb-8 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <h1 className="font-heading text-type-h3 uppercase mb-2">RideTo Learn</h1>
        <p className="font-body text-type-body text-gray-300 mb-4 max-w-[520px]">
          Free courses to prepare you for every stage of your riding journey — from your first CBT booking through to advanced riding techniques.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-body text-type-small text-gray-400">
            <span className="font-bold text-white">{activeCourses.length + comingSoonCourses.length}</span> courses
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 font-body text-type-small text-gray-400">
            Covering the <span className="font-bold text-white">complete</span> rider journey
          </div>
        </div>
      </section>

      {/* Available Now */}
      {activeCourses.length > 0 && (
        <section className="mb-10">
          <h2 className="font-body text-type-tag font-bold text-gray-400 uppercase tracking-[0.06em] mb-4 px-1">
            Available Now
          </h2>
          <div className="flex flex-col gap-3">
            {activeCourses.map((c) => {
              const dbCourse = dbCourses.find((d) => d.slug === c.slug);
              const courseModules = dbCourse?.modules ?? [];
              const courseLessons = courseModules.reduce((s, m) => s + m.lessons.length, 0);
              return (
                <CourseCard
                  key={c.slug}
                  course={c}
                  progress={
                    courseLessons > 0
                      ? { completed, total: totalLessons }
                      : undefined
                  }
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Coming Soon */}
      {comingSoonCourses.length > 0 && (
        <section className="pb-12">
          <h2 className="font-body text-type-tag font-bold text-gray-400 uppercase tracking-[0.06em] mb-4 px-1">
            Coming Soon
          </h2>
          <div className="flex flex-col gap-3">
            {comingSoonCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
