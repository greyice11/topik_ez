import { getFlashcards } from "@/app/actions"
import VocabClient from "./client"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const cards = await getFlashcards()
  return <VocabClient cards={cards} />
}
