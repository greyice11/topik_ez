import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { TOPIK_DATA } from '../lib/topik-content'

const prisma = new PrismaClient()

async function main() {
  // Clean up
  await prisma.lessonProgress.deleteMany()
  await prisma.question.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.unit.deleteMany()
  await prisma.topikLevel.deleteMany()
  // Note: We don't delete Users so you don't lose your login, 
  // but if you want a fresh start, uncomment:
  // await prisma.user.deleteMany()

  // --- LEVELS ---
  const levels = {
    3: await prisma.topikLevel.create({ data: { level: 3, title: "Intermediate (Level 3)" } }),
    4: await prisma.topikLevel.create({ data: { level: 4, title: "Intermediate High (Level 4)" } }),
    5: await prisma.topikLevel.create({ data: { level: 5, title: "Advanced (Level 5)" } }),
    6: await prisma.topikLevel.create({ data: { level: 6, title: "Mastery (Level 6)" } }),
  }

  // --- POPULATE CONTENT ---
  // We will create "Topic" based units (e.g., Grammar, Reading, Listening)
  // And distribute the questions into them.

  for (const [levelKey, levelObj] of Object.entries(levels)) {
    const lvl = parseInt(levelKey)
    const questionsForLevel = TOPIK_DATA.filter(q => q.level === lvl)

    if (questionsForLevel.length === 0) continue

    // Create Units based on types found (Grammar, Reading, Vocab)
    const types = Array.from(new Set(questionsForLevel.map(q => q.type)))
    
    let unitOrder = 1
    for (const type of types) {
      // Create a Unit for this type (e.g., "Level 3 Grammar")
      const unit = await prisma.unit.create({
        data: {
          title: `${type} Practice`,
          description: `Mastering Level ${lvl} ${type}`,
          order: unitOrder++,
          levelId: levelObj.id
        }
      })

      // Create a Lesson
      const lesson = await prisma.lesson.create({
        data: {
          title: `${type} Drill Set 1`,
          type: type,
          order: 1,
          unitId: unit.id
        }
      })

      // Add Questions
      const questionsToAdd = questionsForLevel.filter(q => q.type === type)
      for (const q of questionsToAdd) {
        // Combine passage and question prompt if reading
        let finalContent = q.content
        // @ts-ignore
        if (q.question) {
          // @ts-ignore
          finalContent = `${q.content}\n\nQ. ${q.question}`
        }

        await prisma.question.create({
          data: {
            type: "MULTIPLE_CHOICE",
            content: finalContent,
            explanation: q.explanation,
            correctAnswer: q.answer,
            options: q.options,
            lessonId: lesson.id
          }
        })
      }
    }
  }

  // Admin User (Ensure exists)
  const hashedPassword = await bcrypt.hash("password123", 10)
  await prisma.user.upsert({
    where: { email: "admin@topik.com" },
    update: {},
    create: {
      email: "admin@topik.com",
      username: "Admin",
      password: hashedPassword,
      totalXP: 9999,
      streak: 100,
      gems: 1000
    }
  })

  console.log("Seeded with TOPIK content library")
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