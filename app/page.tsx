'use client';

import { useEffect, useState } from 'react';
import CourseCard from "@/components/CourseCard";
import { catalogue, totalLessons } from "@/lib/course-data";
import { getCourseCompletedCount } from "@/lib/progress";

export default function Home() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(getCourseCompletedCount());
  }, []);

  const activeCourses = catalogue.filter((c) => !c.comingSoon);
  const comingSoonCourses = catalogue.filter((c) => c.comingSoon);

  return (
    <div className="mx-auto max-w-[800px] px-4">
      {/* Hero */}
      <section
        className="bg-[#434343] rounded-b-2xl px-6 pt-8 pb-10 mb-8 text-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
      >
        <h1 className="text-2xl sm:text-[28px] font-bold leading-tight mb-2">
          RideTo Learn
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 max-w-[520px]">
          Free courses to prepare you for every stage of your riding journey — from your first CBT booking through to advanced riding techniques.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="font-semibold text-white">{catalogue.length}</span> courses
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            Covering the <span className="font-semibold text-white">complete</span> rider journey
          </div>
        </div>
      </section>

      {/* Active courses */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">
          Available Now
        </h2>
        <div className="flex flex-col gap-3">
          {activeCourses.map((c) => (
            <CourseCard
              key={c.slug}
              course={c}
              progress={
                c.slug === "pre-cbt"
                  ? { completed, total: totalLessons }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* Coming soon courses */}
      <section className="pb-12">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">
          Coming Soon
        </h2>
        <div className="flex flex-col gap-3">
          {comingSoonCourses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
