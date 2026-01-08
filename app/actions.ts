'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { login as authLogin, logout as authLogout, getSession } from "@/lib/auth"
import * as bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

// --- Auth Actions ---

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const username = formData.get("username") as string

  if (!email || !password || !username) return { error: "All fields required" }

  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: "User already exists" }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    }
  })

  await authLogin(user.id)
  redirect("/")
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: "Invalid credentials" }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { error: "Invalid credentials" }

  await authLogin(user.id)
  redirect("/")
}

export async function logout() {
  await authLogout()
  redirect("/login")
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session?.userId) return null

  return await prisma.user.findUnique({
    where: { id: session.userId as string }
  })
}

// --- Content Actions ---

export async function getCurriculum() {
  // Fetch Levels -> Units -> Lessons
  // Optimized for the homepage view
  return await prisma.topikLevel.findMany({
    include: {
      units: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              progress: true // We'll filter by user later or handle in UI
            }
          }
        }
      }
    },
    orderBy: { level: 'asc' }
  })
}

export async function getLesson(lessonId: string) {
  return await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      questions: true
    }
  })
}

export async function completeLesson(lessonId: string, score: number) {
  const session = await getSession()
  if (!session?.userId) return

  // Update Progress
  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.userId as string,
        lessonId,
      }
    },
    update: { completed: true, score },
    create: {
      userId: session.userId as string,
      lessonId,
      completed: true,
      score
    }
  })

  // Award XP
  await prisma.user.update({
    where: { id: session.userId as string },
    data: { 
      totalXP: { increment: 10 + score }, // Base 10 + score
      streak: { increment: 1 } // Naive streak for now
    }
  })

  revalidatePath("/")
}

export async function getLeaderboard() {
  return await prisma.user.findMany({
    orderBy: { totalXP: 'desc' },
    take: 10,
    select: {
      id: true,
      username: true,
      totalXP: true,
      streak: true
    }
  })
}
