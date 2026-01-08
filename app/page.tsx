import { getUser } from "./actions"
import Link from "next/link"
import { Trophy, Flame, BookOpen, Star } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getUser()
  const today = new Date()
  const testDate = new Date("2026-03-21")
  const daysLeft = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="flex flex-col h-screen pb-20">
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 text-yellow-500 font-bold">
          <Flame className="w-6 h-6 fill-current" />
          <span>{user.streak}</span>
        </div>
        <div className="font-bold text-lg text-gray-800">TOPIK Legend</div>
        <div className="flex items-center gap-2 text-yellow-600 font-bold">
          <Trophy className="w-6 h-6" />
          <span>{user.totalXP}</span>
        </div>
      </header>

      {/* Countdown Banner */}
      <div className="bg-indigo-600 text-white p-4 text-center shadow-md">
        <p className="text-sm font-semibold opacity-80">TOPIK II Test Date</p>
        <h2 className="text-2xl font-bold">{daysLeft} Days Left!</h2>
      </div>

      {/* Learning Path */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8 flex flex-col items-center">
        
        {/* Unit 1 */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg w-full text-center">
            Unit 1: Foundations
          </div>
          
          <Link href="/learn/vocab" className="relative group">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all">
              <Star className="w-10 h-10 fill-white" />
            </div>
            <div className="absolute -bottom-6 w-full text-center font-bold text-gray-600 text-sm">Vocab</div>
          </Link>

           <div className="h-8 w-2 bg-gray-200 rounded-full"></div>

          <Link href="/learn/reading" className="relative group">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-6 w-full text-center font-bold text-gray-600 text-sm">Reading</div>
          </Link>
        </div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full max-w-[450px] bg-white border-t border-gray-200 flex justify-around py-3 pb-6">
        <Link href="/" className="flex flex-col items-center text-green-600">
          <div className="p-1 rounded-lg bg-green-100">
             <BookOpen className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-gray-600">
          <div className="p-1">
             <Trophy className="w-6 h-6" />
          </div>
        </Link>
      </nav>
    </div>
  )
}