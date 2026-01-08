import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Create Levels
  const level3 = await prisma.topikLevel.create({
    data: { level: 3, title: "Intermediate Low" }
  })
  const level4 = await prisma.topikLevel.create({
    data: { level: 4, title: "Intermediate High" }
  })

  // 2. Create Units for Level 3
  const unit1 = await prisma.unit.create({
    data: {
      title: "Daily Life & Hobbies",
      description: "Discussing personal interests",
      order: 1,
      levelId: level3.id
    }
  })

  // 3. Create Lessons for Unit 1
  // Lesson 1: Vocab
  const vocabLesson = await prisma.lesson.create({
    data: {
      title: "Essential Verbs",
      type: "VOCAB",
      order: 1,
      unitId: unit1.id
    }
  })

  // Lesson 2: Reading (Exam Style)
  const readingLesson = await prisma.lesson.create({
    data: {
      title: "Short Passage Analysis",
      type: "READING",
      order: 2,
      unitId: unit1.id
    }
  })

  // 4. Add Questions
  // Vocab Questions
  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: "Which word means 'to experience'?",
      options: ["경험하다", "설명하다", "방문하다", "운동하다"],
      correctAnswer: "경험하다",
      explanation: "경험하다 comes from the noun 경험 (experience).",
      lessonId: vocabLesson.id
    }
  })

  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: "Choose the synonym for '참석하다' (to attend).",
      options: ["참가하다", "준비하다", "출발하다", "성공하다"],
      correctAnswer: "참가하다",
      lessonId: vocabLesson.id
    }
  })

  // Reading Question (TOPIK Style)
  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: `
다음 문장을 읽고 ( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.

저는 주말마다 등산을 합니다. 산에 오르면 공기도 맑고 기분도 (       ).
      `.trim(),
      options: ["상쾌해집니다", "복잡해집니다", "위험해집니다", "우울해집니다"],
      correctAnswer: "상쾌해집니다",
      explanation: "The context is positive (fresh air), so 'feel refreshed' (상쾌해집니다) is the correct fit.",
      lessonId: readingLesson.id
    }
  })

  // 5. Create Default User
  const hashedPassword = await bcrypt.hash("password123", 10)
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      username: "TopikMaster",
      password: hashedPassword,
      totalXP: 100,
      streak: 5
    }
  })

  console.log("Seeding completed!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })