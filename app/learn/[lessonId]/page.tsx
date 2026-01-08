import { getLesson } from "@/app/actions"
import VocabClient from "./client"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lessonId: string }>
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params
  const lesson = await getLesson(lessonId)
  
  if (!lesson) redirect("/")

  return <VocabClient lesson={lesson} />
}
