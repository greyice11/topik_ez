import { getCurrentUser } from "@/app/actions"
import { Shield, Zap, Heart } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const user = await getCurrentUser()

  const ITEMS = [
    { id: 1, name: "Streak Freeze", description: "Keep your streak for one day of inactivity.", price: 200, icon: Shield, color: "text-blue-500" },
    { id: 2, name: "Double XP", description: "Earn double XP for the next 30 minutes.", price: 100, icon: Zap, color: "text-yellow-500" },
    { id: 3, name: "Refill Hearts", description: "Get full health immediately.", price: 50, icon: Heart, color: "text-red-500" },
  ]

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-6">Shop</h1>

      {/* Gem Balance */}
      <div className="w-full bg-blue-500 text-white p-6 rounded-2xl mb-8 flex justify-between items-center shadow-lg">
        <span className="font-bold text-lg">Your Balance</span>
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 bg-blue-200 rotate-45" />
           <span className="text-2xl font-extrabold">{user?.gems || 0}</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        {ITEMS.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-2 border-gray-200 rounded-2xl bg-white">
            <item.icon className={`w-12 h-12 ${item.color} mr-4`} />
            <div className="flex-1">
               <h3 className="font-bold text-gray-800">{item.name}</h3>
               <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <button className="bg-gray-100 text-blue-500 font-bold px-4 py-2 rounded-xl flex items-center gap-2 border-b-2 border-gray-200 active:border-b-0 active:translate-y-[2px]">
               <div className="w-3 h-3 bg-blue-400 rotate-45" />
               {item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
