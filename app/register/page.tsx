import Link from "next/link";
import { register } from "@/app/actions";
import { Mascot } from "@/components/ui/Mascot";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <Mascot emotion="excited" />
      <h1 className="text-3xl font-extrabold text-gray-800 mt-6 mb-8">Create Profile</h1>
      
      <form action={register} className="w-full max-w-sm space-y-4">
        <div>
          <input 
            name="username" 
            type="text" 
            placeholder="Name" 
            required 
            className="w-full p-4 bg-gray-100 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-gray-700"
          />
        </div>
        <div>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full p-4 bg-gray-100 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-gray-700"
          />
        </div>
        <div>
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full p-4 bg-gray-100 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-gray-700"
          />
        </div>
        
        <button type="submit" className="btn-primary mt-4">
          CREATE ACCOUNT
        </button>
      </form>

      <div className="mt-8 font-bold text-gray-400">
        Already have an account? <Link href="/login" className="text-blue-500 uppercase">Log in</Link>
      </div>
    </div>
  );
}
