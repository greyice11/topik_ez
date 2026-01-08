import { getFlashcards } from "@/app/actions"
import VocabClient from "./client"

export default async function Page() {
  const cards = await getFlashcards()
  return <VocabClient cards={cards} />
}
