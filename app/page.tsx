import { getCurrentUser, getCurriculum } from "./actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trophy, Flame, Star, BookOpen, Lock, Check, Headphones, PenTool } from "lucide-react";
import { Mascot } from "@/components/ui/Mascot";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const levels = await getCurriculum();

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      
      {/* Top Status Bar */}
      <header className="fixed top-0 lg:left-[256px] left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b-2 border-gray-100 z-40 flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-6 bg-gray-200 rounded overflow-hidden relative border border-gray-300">
             <div className="absolute inset-0 bg-white flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500/50 mix-blend-multiply absolute top-1" />
                <div className="w-3 h-3 rounded-full bg-blue-500/50 mix-blend-multiply absolute bottom-1" />
             </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-orange-500 font-extrabold">
            <Flame className="w-6 h-6 fill-current" />
            <span>{user.streak}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-500 font-extrabold">
            <Trophy className="w-6 h-6 fill-current" />
            <span>{user.totalXP}</span>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20 w-full" />

      {/* Curriculum Path */}
      <div className="w-full space-y-12 pb-20">
        {levels.map((level) => (
          <div key={level.id} className="w-full">
            <div className="text-center mb-6">
              <span className="inline-block bg-gray-200 text-gray-500 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-widest">
                Level {level.level}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-700 mt-2">{level.title}</h2>
            </div>

            {level.units.map((unit) => (
              <div key={unit.id} className="relative flex flex-col items-center mb-12">
                
                {/* Unit Header */}
                <div className="w-full py-4 px-6 mb-8 bg-[#58cc02] text-white rounded-2xl flex justify-between items-center shadow-sm mx-4">
                  <div>
                    <h2 className="text-xl font-extrabold uppercase tracking-wide opacity-90">Unit {unit.order}</h2>
                    <p className="font-bold">{unit.title}</p>
                  </div>
                  <BookOpen className="w-8 h-8 opacity-50" />
                </div>

                {/* Lessons (Nodes) */}
                <div className="space-y-6 flex flex-col items-center w-full">
                  {unit.lessons.map((lesson, index) => {
                    const offset = index % 2 === 0 ? "0px" : index % 4 === 1 ? "40px" : "-40px";
                    // For now, assume first is unlocked or based on progress logic
                    const isLocked = false; 
                    
                    const Icon = 
                      lesson.type === 'VOCAB' ? Star :
                      lesson.type === 'READING' ? BookOpen :
                      lesson.type === 'LISTENING' ? Headphones : PenTool;

                    return (
                      <div 
                        key={lesson.id} 
                        className="relative flex justify-center w-full"
                        style={{ transform: `translateX(${offset})` }}
                      >
                        <Link href={`/learn/${lesson.id}`}>
                          <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center relative transition-transform active:scale-95",
                            isLocked ? "bg-gray-200 shadow-[0_6px_0_#cecece]" : "bg-[#58cc02] shadow-[0_6px_0_#46a302]"
                          )}>
                             <Icon className={cn("w-9 h-9", isLocked ? "text-gray-400" : "text-white fill-current")} />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}