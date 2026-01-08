'use server'

import { prisma } from "@/lib/db"

export async function getUser() {
  const user = await prisma.user.findFirst()
  if (!user) {
    // Fallback if seed didn't run or something weird happened
    return await prisma.user.create({
      data: { username: "Legend" }
    })
  }
  return user
}

export async function getFlashcards() {
  return await prisma.flashcard.findMany({
    take: 20, // Start with 20
  })
}

export async function updateXP(amount: number) {
  const user = await prisma.user.findFirst()
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { totalXP: { increment: amount } }
    })
  }
}
