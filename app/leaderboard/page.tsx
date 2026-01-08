import { getLeaderboard, getCurrentUser } from "@/app/actions"
import { Trophy, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const users = await getLeaderboard()
  const currentUser = await getCurrentUser()

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-6">Leaderboard</h1>

      <div className="w-full space-y-4">
        {users.map((user, index) => {
          const isMe = user.id === currentUser?.id
          
          return (
            <div 
              key={user.id} 
              className={cn(
                "flex items-center p-4 rounded-xl border-2",
                isMe ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
              )}
            >
              <div className="font-bold text-gray-500 w-8 text-center">{index + 1}</div>
              
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 mx-4 overflow-hidden">
                 {/* Avatar placeholder */}
                 {user.username[0].toUpperCase()}
              </div>
              
              <div className="flex-1 font-bold text-gray-700">
                {user.username} {isMe && "(You)"}
              </div>

              <div className="font-bold text-gray-700">
                {user.totalXP} XP
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
