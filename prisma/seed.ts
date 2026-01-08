import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const vocab = [
  { korean: "검토하다", english: "to examine, review", level: "Level 4" },
  { korean: "경향", english: "tendency, trend", level: "Level 4" },
  { korean: "고집", english: "stubbornness", level: "Level 4" },
  { korean: "권리", english: "right, claim", level: "Level 4" },
  { korean: "극복하다", english: "to overcome", level: "Level 4" },
  { korean: "논란", english: "controversy", level: "Level 5" },
  { korean: "대안", english: "alternative", level: "Level 5" },
  { korean: "도모하다", english: "to plan, promote", level: "Level 5" },
  { korean: "모순", english: "contradiction", level: "Level 5" },
  { korean: "바람직하다", english: "to be desirable", level: "Level 5" },
]

async function main() {
  // Create default user
  const user = await prisma.user.create({
    data: {
      username: "TopikLegend",
      totalXP: 0,
      streak: 1,
      lastStudyDate: new Date(),
    }
  })

  console.log(`Created user: ${user.username}`)

  // Seed Vocab
  for (const word of vocab) {
    await prisma.flashcard.create({
      data: {
        ...word,
      }
    })
  }
  console.log(`Seeded ${vocab.length} flashcards`)
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
