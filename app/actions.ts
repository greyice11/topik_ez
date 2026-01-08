'use server'

import { prisma } from "@/lib/db"

export async function getUser() {
  try {
    const user = await prisma.user.findFirst()
    if (!user) {
      // Fallback if seed didn't run or something weird happened
      return await prisma.user.create({
        data: { username: "Legend" }
      })
    }
    return user
  } catch (error) {
    console.error("Database Error in getUser:", error)
    // Return a dummy user to prevent crash
    return {
      id: "dummy",
      createdAt: new Date(),
      username: "Guest",
      totalXP: 0,
      streak: 0,
      lastStudyDate: null
    }
  }
}

export async function getFlashcards() {
  try {
    console.log("Attempting to fetch flashcards...")
    const cards = await prisma.flashcard.findMany({
      take: 20,
    })
    console.log(`Successfully fetched ${cards.length} cards`)
    return cards
  } catch (error) {
    console.error("Failed to fetch flashcards:", error)
    return [] // Return empty array instead of crashing
  }
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
