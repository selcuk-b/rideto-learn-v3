import 'dotenv/config'
import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { course } from '../lib/course-data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database from static course data...')

  // ── Upsert Course ──────────────────────────────────────────────────────────
  const dbCourse = await prisma.course.upsert({
    where: { slug: course.slug },
    create: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      trainingType: course.trainingType,
      estimatedTime: course.estimatedTime,
      status: course.status,
      order: 1,
    },
    update: {
      title: course.title,
      description: course.description,
      status: course.status,
    },
  })
  console.log(`  ✅ Course: "${dbCourse.title}"`)

  // ── Upsert Course-Level Quiz ───────────────────────────────────────────────
  if (course.quiz) {
    const dbQuiz = await prisma.quiz.upsert({
      where: { courseId: dbCourse.id },
      create: {
        id: course.quiz.id,
        title: course.quiz.title,
        description: course.quiz.description,
        passingScore: course.quiz.passingScore,
        courseId: dbCourse.id,
      },
      update: {
        title: course.quiz.title,
        passingScore: course.quiz.passingScore,
      },
    })
    console.log(`  ✅ Quiz: "${dbQuiz.title}" (${course.quiz.questions.length} questions)`)

    for (let i = 0; i < course.quiz.questions.length; i++) {
      const q = course.quiz.questions[i]
      await prisma.question.upsert({
        where: { id: q.id },
        create: {
          id: q.id,
          questionText: q.questionText,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation,
          image: q.image ?? null,
          order: i,
          quizId: dbQuiz.id,
        },
        update: {
          questionText: q.questionText,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation,
        },
      })
    }
  }

  // ── Upsert Modules & Lessons ───────────────────────────────────────────────
  for (const mod of course.modules) {
    const dbModule = await prisma.module.upsert({
      where: { courseId_slug: { courseId: dbCourse.id, slug: mod.slug } },
      create: {
        id: mod.id,
        slug: mod.slug,
        title: mod.title,
        description: mod.description,
        order: mod.order,
        estimatedTime: mod.estimatedTime,
        icon: mod.icon ?? null,
        courseId: dbCourse.id,
      },
      update: {
        title: mod.title,
        description: mod.description,
        order: mod.order,
        estimatedTime: mod.estimatedTime,
      },
    })
    console.log(`  ✅ Module ${mod.order}: "${dbModule.title}" (${mod.lessons.length} lessons)`)

    for (const lesson of mod.lessons) {
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: dbModule.id, slug: lesson.slug } },
        create: {
          id: lesson.id,
          slug: lesson.slug,
          title: lesson.title,
          order: lesson.order,
          content: lesson.content,
          estimatedReadTime: lesson.estimatedReadTime,
          youtubeVideoId: lesson.youtubeVideoId ?? null,
          keyTakeaway: lesson.keyTakeaway,
          moduleId: dbModule.id,
        },
        update: {
          title: lesson.title,
          content: lesson.content,
          estimatedReadTime: lesson.estimatedReadTime,
          youtubeVideoId: lesson.youtubeVideoId ?? null,
          keyTakeaway: lesson.keyTakeaway,
        },
      })
    }
    console.log(`    ↳ ${mod.lessons.map(l => l.slug).join(', ')}`)
  }

  console.log('\n✨ Seed complete!')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
