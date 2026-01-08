import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing content (optional, but good for clean slate if schema changed)
  // await prisma.question.deleteMany()
  // await prisma.lesson.deleteMany()
  // await prisma.unit.deleteMany()
  // await prisma.topikLevel.deleteMany()

  // --- LEVELS ---
  const level3 = await prisma.topikLevel.create({ data: { level: 3, title: "Intermediate: Foundation" } })
  const level4 = await prisma.topikLevel.create({ data: { level: 4, title: "Intermediate: Mastery" } })
  const level5 = await prisma.topikLevel.create({ data: { level: 5, title: "Advanced: Professional" } })

  // --- LEVEL 3 CONTENT ---
  
  // Unit 1: Public Life
  const l3u1 = await prisma.unit.create({
    data: { title: "Public Facilities", description: "Post office, Bank, Immigration", order: 1, levelId: level3.id }
  })

  // L3 U1 Lesson 1: Vocab
  const l3u1l1 = await prisma.lesson.create({
    data: { title: "Banking Verbs", type: "VOCAB", order: 1, unitId: l3u1.id }
  })
  await prisma.question.createMany({
    data: [
      {
        type: "MULTIPLE_CHOICE",
        content: "Choose the word for 'to deposit money'.",
        options: ["입금하다", "출금하다", "환전하다", "송금하다"],
        correctAnswer: "입금하다",
        explanation: "입 (enter) + 금 (money). 출금하다 is to withdraw.",
        lessonId: l3u1l1.id
      },
      {
        type: "MULTIPLE_CHOICE",
        content: "Choose the word for 'Identity Card'.",
        options: ["신분증", "통장", "도장", "신용카드"],
        correctAnswer: "신분증",
        lessonId: l3u1l1.id
      }
    ]
  })

  // L3 U1 Lesson 2: Reading (Practical Texts)
  const l3u1l2 = await prisma.lesson.create({
    data: { title: "Reading Notices", type: "READING", order: 2, unitId: l3u1.id }
  })
  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: `
[공지] 도서관 이용 안내
이번 주 금요일은 도서관 내부 수리 공사로 인해 휴관합니다.
이용에 착오 없으시기 바랍니다.

Q. 이 글을 쓴 이유는 무엇입니까?
      `.trim(),
      options: ["도서관 문을 닫는 날을 알리려고", "도서관 위치를 설명하려고", "책을 빌리는 방법을 안내하려고", "공사 날짜를 바꾸려고"],
      correctAnswer: "도서관 문을 닫는 날을 알리려고",
      explanation: "The notice says '휴관합니다' (we are closed) due to construction.",
      lessonId: l3u1l2.id
    }
  })

  // --- LEVEL 4 CONTENT ---

  // Unit 1: Social Issues
  const l4u1 = await prisma.unit.create({
    data: { title: "Social Issues", description: "Environment, Inequality", order: 1, levelId: level4.id }
  })

  // L4 U1 Lesson 1: Grammar & Expression
  const l4u1l1 = await prisma.lesson.create({
    data: { title: "Causative Expressions", type: "GRAMMAR", order: 1, unitId: l4u1.id }
  })
  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: "Select the correct completion: '날씨가 너무 더워서 밤에 잠을 _____.' (I couldn't sleep because it was too hot)",
      options: ["설쳤다", "잤다", "일어났다", "꿈꿨다"],
      correctAnswer: "설쳤다",
      explanation: "'잠을 설치다' means to sleep fitfully or poorly.",
      lessonId: l4u1l1.id
    }
  })

  // L4 U1 Lesson 2: Reading (News/Graphs)
  const l4u1l2 = await prisma.lesson.create({
    data: { title: "Analyzing Trends", type: "READING", order: 2, unitId: l4u1.id }
  })
  await prisma.question.create({
    data: {
      type: "MULTIPLE_CHOICE",
      content: `
다음 그래프에 대한 설명으로 맞는 것을 고르십시오.
(Graph shows Smartphone usage increasing from 50% to 90%)

1. 스마트폰 사용률이 감소하고 있다.
2. 스마트폰 사용률이 급격히 증가했다.
3. 스마트폰 사용률이 변화가 없다.
4. 스마트폰 사용률이 조금씩 낮아졌다.
      `.trim(),
      options: ["2", "1", "3", "4"],
      correctAnswer: "2",
      explanation: "The graph shows an increase from 50% to 90%, which is a sharp increase (급격히 증가).",
      lessonId: l4u1l2.id
    }
  })

  // --- LEVEL 5 CONTENT ---

  // Unit 1: Economics & Policy
  const l5u1 = await prisma.unit.create({
    data: { title: "Economics", description: "Market trends, Policy", order: 1, levelId: level5.id }
  })

  const l5u1l1 = await prisma.lesson.create({
    data: { title: "Advanced Vocabulary", type: "VOCAB", order: 1, unitId: l5u1.id }
  })
  await prisma.question.createMany({
    data: [
      {
        type: "MULTIPLE_CHOICE",
        content: "Select the synonym for '육성하다' (to foster/nurture an industry).",
        options: ["키우다", "망치다", "줄이다", "숨기다"],
        correctAnswer: "키우다",
        lessonId: l5u1l1.id
      },
      {
        type: "MULTIPLE_CHOICE",
        content: "Meaning of '변동':",
        options: ["Fluctuation", "Stability", "Investment", "Profit"],
        correctAnswer: "Fluctuation",
        lessonId: l5u1l1.id
      }
    ]
  })

  // Create/Update Admin User
  const hashedPassword = await bcrypt.hash("password123", 10)
  await prisma.user.upsert({
    where: { email: "admin@topik.com" },
    update: { gems: 100 },
    create: {
      email: "admin@topik.com",
      username: "TopikMaster",
      password: hashedPassword,
      totalXP: 1000,
      streak: 50,
      gems: 500
    }
  })

  console.log("Seeding levels 3, 4, 5 completed!")
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
