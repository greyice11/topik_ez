import { getCurrentUser, logout } from "@/app/actions"
import { User, Settings, LogOut } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">
      
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-700">Profile</h1>
        <Settings className="text-gray-400 w-6 h-6" />
      </div>

      {/* Avatar Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-lg">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
        <p className="text-gray-500 font-bold">Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
           <span className="font-bold text-gray-400 uppercase text-xs">Total XP</span>
           <span className="font-extrabold text-2xl text-yellow-500">{user?.totalXP}</span>
        </div>
        <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
           <span className="font-bold text-gray-400 uppercase text-xs">Streak</span>
           <span className="font-extrabold text-2xl text-orange-500">{user?.streak} Day(s)</span>
        </div>
        <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
           <span className="font-bold text-gray-400 uppercase text-xs">League</span>
           <span className="font-extrabold text-2xl text-purple-500">Bronze</span>
        </div>
        <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
           <span className="font-bold text-gray-400 uppercase text-xs">Top Finish</span>
           <span className="font-extrabold text-2xl text-gray-700"># --</span>
        </div>
      </div>

      {/* Logout */}
      <form action={logout} className="w-full">
        <button className="w-full py-3 rounded-2xl border-2 border-gray-200 text-red-500 font-bold uppercase tracking-widest hover:bg-red-50 flex justify-center items-center gap-2">
           <LogOut className="w-5 h-5" />
           Log Out
        </button>
      </form>

    </div>
  )
}
