import { prisma } from './prisma'
import type { Course, Module, Lesson, Quiz, Question } from './course-data'

/** Transform Prisma result to match existing Course interface (null → undefined for optional fields) */
function transformLesson(l: {
  id: string; slug: string; title: string; order: number; content: string;
  estimatedReadTime: string; youtubeVideoId: string | null; keyTakeaway: string;
}): Lesson {
  return {
    id: l.id, slug: l.slug, title: l.title, order: l.order,
    content: l.content, estimatedReadTime: l.estimatedReadTime,
    youtubeVideoId: l.youtubeVideoId ?? undefined,
    keyTakeaway: l.keyTakeaway,
  }
}

function transformQuestion(q: {
  id: string; questionText: string; options: string[]; correctAnswerIndex: number;
  explanation: string; image: string | null; order: number;
}): Question {
  return {
    id: q.id, questionText: q.questionText, options: q.options,
    correctAnswerIndex: q.correctAnswerIndex, explanation: q.explanation,
    image: q.image ?? undefined,
  }
}

function transformQuiz(quiz: {
  id: string; title: string; description: string; passingScore: number;
  questions: { id: string; questionText: string; options: string[]; correctAnswerIndex: number; explanation: string; image: string | null; order: number }[];
} | null): Quiz | undefined {
  if (!quiz) return undefined
  return {
    id: quiz.id, title: quiz.title, description: quiz.description,
    passingScore: quiz.passingScore,
    questions: quiz.questions.map(transformQuestion),
  }
}

function transformModule(m: {
  id: string; slug: string; title: string; description: string; order: number;
  estimatedTime: string; icon: string | null;
  lessons: { id: string; slug: string; title: string; order: number; content: string; estimatedReadTime: string; youtubeVideoId: string | null; keyTakeaway: string }[];
  quiz: { id: string; title: string; description: string; passingScore: number; questions: { id: string; questionText: string; options: string[]; correctAnswerIndex: number; explanation: string; image: string | null; order: number }[] } | null;
}): Module {
  return {
    id: m.id, slug: m.slug, title: m.title, description: m.description,
    order: m.order, estimatedTime: m.estimatedTime, icon: m.icon ?? undefined,
    lessons: m.lessons.map(transformLesson),
    quiz: transformQuiz(m.quiz),
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const raw = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          quiz: { include: { questions: { orderBy: { order: 'asc' } } } },
        },
      },
      quiz: { include: { questions: { orderBy: { order: 'asc' } } } },
    },
  })
  if (!raw) return null

  return {
    id: raw.id, slug: raw.slug, title: raw.title, description: raw.description,
    trainingType: raw.trainingType, estimatedTime: raw.estimatedTime,
    status: raw.status as 'draft' | 'published' | 'archived',
    modules: raw.modules.map(transformModule),
    quiz: transformQuiz(raw.quiz),
  }
}

export async function getAllPublishedCourses(): Promise<Course[]> {
  const rows = await prisma.course.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          quiz: { include: { questions: { orderBy: { order: 'asc' } } } },
        },
      },
      quiz: { include: { questions: { orderBy: { order: 'asc' } } } },
    },
  })
  return rows.map((raw) => ({
    id: raw.id, slug: raw.slug, title: raw.title, description: raw.description,
    trainingType: raw.trainingType, estimatedTime: raw.estimatedTime,
    status: raw.status as 'draft' | 'published' | 'archived',
    modules: raw.modules.map(transformModule),
    quiz: transformQuiz(raw.quiz),
  }))
}
