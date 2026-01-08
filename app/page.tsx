import { getUser } from "./actions";
import Link from "next/link";
import { Trophy, Flame, Star, BookOpen, Lock, Check } from "lucide-react";
import { Mascot } from "@/components/ui/Mascot";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

// Mock Data for the Path
const UNITS = [
  {
    id: 1,
    title: "Unit 1",
    description: "Hangul Basics & Greetings",
    color: "bg-[#58cc02]", // Green
    nodes: [
      { id: "vocab", type: "star", status: "active", label: "Vocab" },
      { id: "reading-1", type: "book", status: "locked", label: "Reading" },
      { id: "grammar-1", type: "book", status: "locked", label: "Grammar" },
    ]
  },
  {
    id: 2,
    title: "Unit 2",
    description: "Daily Life & Numbers",
    color: "bg-[#ce82ff]", // Purple
    nodes: [
      { id: "vocab-2", type: "star", status: "locked", label: "Vocab" },
      { id: "reading-2", type: "book", status: "locked", label: "Reading" },
    ]
  }
];

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      
      {/* Top Status Bar (Mobile-ish View) */}
      <header className="fixed top-0 lg:left-[256px] left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b-2 border-gray-100 z-40 flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-6 bg-gray-200 rounded overflow-hidden relative border border-gray-300">
             {/* Simple Korea Flag Representation */}
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

      {/* Spacer for fixed header */}
      <div className="h-20 w-full" />

      {/* Learning Path */}
      <div className="w-full space-y-8 pb-20">
        {UNITS.map((unit) => (
          <div key={unit.id} className="relative flex flex-col items-center">
            
            {/* Unit Header */}
            <div className={cn("w-full py-4 px-6 mb-8 text-white rounded-2xl flex justify-between items-center shadow-sm", unit.color)}>
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-wide opacity-90">{unit.title}</h2>
                <p className="font-bold">{unit.description}</p>
              </div>
              <BookOpen className="w-8 h-8 opacity-50" />
            </div>

            {/* Path Nodes */}
            <div className="space-y-6 flex flex-col items-center w-full">
              {unit.nodes.map((node, index) => {
                // Calculate zig-zag offset
                const offset = index % 2 === 0 ? "0px" : index % 4 === 1 ? "40px" : "-40px";
                
                return (
                  <div 
                    key={node.id} 
                    className="relative flex justify-center w-full"
                    style={{ transform: `translateX(${offset})` }}
                  >
                    
                    {/* The Node Button */}
                    <Link href={node.status === 'locked' ? '#' : `/learn/${node.id.includes('vocab') ? 'vocab' : 'reading'}`}>
                      <div className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center relative transition-transform active:scale-95",
                        node.status === "active" 
                          ? "bg-[#58cc02] shadow-[0_6px_0_#46a302]" 
                          : node.status === "completed" 
                            ? "bg-[#ffc800] shadow-[0_6px_0_#e5a400]" 
                            : "bg-gray-200 shadow-[0_6px_0_#cecece]"
                      )}>
                        {/* Icon inside Node */}
                        {node.status === "locked" ? (
                           <Lock className="w-8 h-8 text-gray-400" />
                        ) : node.type === "star" ? (
                           <Star className="w-10 h-10 text-white fill-current" />
                        ) : (
                           <BookOpen className="w-9 h-9 text-white fill-current" />
                        )}

                        {/* Crown for completed */}
                        {node.status === "completed" && (
                          <div className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full border-2 border-white">
                             <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        {/* Label Bubble */}
                        {node.status === "active" && (
                           <div className="absolute -top-10 bg-white px-3 py-1 rounded-xl border-2 border-gray-200 text-xs font-bold text-gray-500 animate-bounce">
                             START
                           </div>
                        )}
                      </div>
                    </Link>

                    {/* Mascot appearing next to active node */}
                    {node.status === "active" && (
                      <div className="absolute left-[110%] top-0">
                         <Mascot emotion="excited" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}