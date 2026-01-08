import Link from "next/link";
import { login } from "@/app/actions";
import { Mascot } from "@/components/ui/Mascot";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <Mascot emotion="happy" />
      <h1 className="text-3xl font-extrabold text-gray-800 mt-6 mb-8">Welcome Back!</h1>
      
      <form action={login} className="w-full max-w-sm space-y-4">
        <div>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full p-4 bg-gray-100 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-gray-700"
          />
        </div>
        <div>
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full p-4 bg-gray-100 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-gray-700"
          />
        </div>
        
        <button type="submit" className="btn-primary mt-4">
          LOG IN
        </button>
      </form>

      <div className="mt-8 font-bold text-gray-400">
        Don't have an account? <Link href="/register" className="text-blue-500 uppercase">Sign up</Link>
      </div>
    </div>
  );
}
