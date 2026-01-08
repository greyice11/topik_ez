import { getCurrentUser } from "@/app/actions"
import { CheckCircle, Circle } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function QuestsPage() {
  const user = await getCurrentUser()

  // Mock Quests
  const QUESTS = [
    { id: 1, title: "Earn 50 XP", progress: Math.min(user?.totalXP || 0, 50), total: 50, reward: 10 },
    { id: 2, title: "Complete 1 Lesson", progress: 0, total: 1, reward: 20 },
  ]

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-6">Daily Quests</h1>

      <div className="w-full space-y-6">
        {QUESTS.map((quest) => {
          const percent = (quest.progress / quest.total) * 100
          
          return (
            <div key={quest.id} className="border-2 border-gray-200 rounded-2xl p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-gray-800 text-lg">{quest.title}</h3>
                 <div className="flex items-center gap-1 font-bold text-blue-500">
                    <div className="w-3 h-3 bg-blue-400 rotate-45" />
                    +{quest.reward}
                 </div>
              </div>
              
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                 <div 
                   className="h-full bg-yellow-400 rounded-full transition-all"
                   style={{ width: `${percent}%` }} 
                 />
                 <div className="absolute top-0 w-full text-center text-xs font-bold text-black/50 leading-4">
                    {quest.progress} / {quest.total}
                 </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
