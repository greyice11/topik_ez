'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { completeLesson } from '@/app/actions'
import { Mascot } from '@/components/ui/Mascot'
import { cn } from '@/lib/utils'

// Types based on Prisma Schema
interface Question {
  id: string
  type: string
  content: string
  options: string[]
  correctAnswer: string
  explanation: string | null
}

interface Lesson {
  id: string
  title: string
  type: string
  questions: Question[]
}

export default function LessonClient({ lesson }: { lesson: Lesson }) {
  const [index, setIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [hearts, setHearts] = useState(5)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  
  const currentQuestion = lesson.questions[index]

  // Shuffle options if needed, but for TOPIK reading usually they are fixed order (1,2,3,4)
  // For Vocab, maybe shuffle. Let's keep DB order for now to be safe.
  const options = currentQuestion?.options || []

  const handleCheck = async () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === currentQuestion.correctAnswer
    if (isCorrect) {
      setStatus('correct')
      setScore(s => s + 10)
    } else {
      setStatus('wrong')
      setHearts(h => Math.max(0, h - 1))
    }
  }

  const handleContinue = async () => {
    setStatus('idle')
    setSelectedOption(null)
    
    if (index + 1 >= lesson.questions.length) {
      await completeLesson(lesson.id, score)
      setIsCompleted(true)
    } else {
      setIndex(prev => prev + 1)
    }
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-center">
        <Mascot emotion="excited" />
        <h1 className="text-3xl font-extrabold text-yellow-500 mt-6 mb-2">Lesson Complete!</h1>
        <p className="text-xl font-bold text-gray-400 mb-8">You earned {score + 10} XP</p>
        <Link href="/" className="btn-primary w-full max-w-xs">
          CONTINUE
        </Link>
      </div>
    )
  }

  if (!currentQuestion) return <div>Loading...</div>

  const progress = ((index) / lesson.questions.length) * 100

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white overflow-hidden relative">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-4">
        <Link href="/">
           <X className="text-gray-400 w-8 h-8 hover:bg-gray-100 rounded-full p-1 cursor-pointer" />
        </Link>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#58cc02] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-red-500 font-bold">
           <span className="text-xl">♥</span> {hearts}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-32 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {lesson.type === 'READING' ? "Read and answer" : "Select the correct meaning"}
        </h2>

        {/* Content Area (Passage or Vocab) */}
        <div className={cn("flex-1", lesson.type === 'READING' ? "lg:flex lg:gap-8 lg:overflow-hidden" : "")}>
          
          {/* Left Panel: Reading Passage (IBT Style) */}
          {lesson.type === 'READING' && (
            <div className="lg:w-1/2 bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-6 lg:mb-0 text-lg leading-relaxed text-gray-800 whitespace-pre-wrap overflow-y-auto font-serif shadow-inner h-full">
              {/* Extract just the passage part before "Q." if we combined them */}
              {currentQuestion.content.split('Q.')[0]}
            </div>
          )}

          {/* Right Panel: Question & Options */}
          <div className={cn("flex flex-col", lesson.type === 'READING' ? "lg:w-1/2 lg:overflow-y-auto" : "w-full")}>
             
             {/* Question Prompt */}
             <div className="flex items-start gap-4 mb-8">
                {lesson.type !== 'READING' && <Mascot emotion={status === 'correct' ? 'happy' : status === 'wrong' ? 'sad' : 'happy'} />}
                <div className={cn("relative border-2 border-gray-200 p-4 rounded-2xl w-full", lesson.type !== 'READING' && "bubble-left")}>
                  <span className="text-lg font-bold text-gray-700">
                    {lesson.type === 'READING' 
                      ? (currentQuestion.content.includes('Q.') ? `Q. ${currentQuestion.content.split('Q.')[1]}` : "Read the passage and answer.")
                      : currentQuestion.content
                    }
                  </span>
                </div>
             </div>

             {/* Options Grid */}
             <div className="space-y-4 pb-20">
               {options.map((opt, i) => {
            const isSelected = selectedOption === opt
            const showCorrect = status !== 'idle' && opt === currentQuestion.correctAnswer
            const showWrong = status === 'wrong' && isSelected && opt !== currentQuestion.correctAnswer

            let borderClass = "border-gray-200 border-b-4 active:border-b-2"
            let bgClass = "bg-white"
            let textClass = "text-gray-700"

            if (status === 'idle') {
                if (isSelected) {
                    borderClass = "border-blue-500 bg-blue-100 border-b-4"
                    textClass = "text-blue-500"
                }
            } else {
                if (showCorrect) {
                    borderClass = "border-green-600 bg-green-100"
                    textClass = "text-green-600"
                } else if (showWrong) {
                    borderClass = "border-red-600 bg-red-100"
                    textClass = "text-red-600"
                } else {
                    borderClass = "border-gray-200 opacity-50"
                }
            }

            return (
              <button
                key={i}
                disabled={status !== 'idle'}
                onClick={() => setSelectedOption(opt)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left font-bold text-lg flex justify-between items-center transition-all",
                  borderClass, bgClass, textClass
                )}
              >
                <span>{opt}</span>
                <span className="text-gray-300 text-sm border border-gray-200 rounded px-2">{i + 1}</span>
              </button>
            )
          })}
        </div>
      </main>

      {/* Footer / Check Button */}
      <footer className="fixed bottom-0 w-full max-w-lg p-6 border-t-2 border-gray-100 bg-white z-10">
        <button 
          onClick={handleCheck}
          disabled={!selectedOption || status !== 'idle'}
          className={cn(
            "w-full py-3 rounded-2xl font-bold text-white uppercase tracking-widest text-sm transition-all",
            !selectedOption ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-[#58cc02] shadow-[0_4px_0_#46a302] active:translate-y-[2px] active:shadow-none"
          )}
          style={{ display: status === 'idle' ? 'block' : 'none' }}
        >
          Check
        </button>
      </footer>

      {/* Feedback Bottom Sheet */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-0 w-full max-w-lg p-6 pb-8 z-50 flex flex-col gap-4 border-t-0",
              status === 'correct' ? "bg-[#d7ffb8] text-green-800" : "bg-[#ffdfe0] text-red-800"
            )}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={cn("p-2 rounded-full", status === 'correct' ? "bg-white" : "bg-white")}>
                {status === 'correct' ? <CheckCircle className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />}
              </div>
              <div className="font-extrabold text-2xl">
                {status === 'correct' ? "Excellent!" : "Incorrect"}
              </div>
            </div>
            
            {status === 'wrong' && (
              <div className="text-red-800 font-bold pl-14 -mt-4 mb-2">
                Correct answer: {currentQuestion.correctAnswer}
              </div>
            )}
            
            {status === 'correct' && currentQuestion.explanation && (
              <div className="text-green-800 font-medium pl-14 -mt-4 mb-2 text-sm opacity-80">
                {currentQuestion.explanation}
              </div>
            )}

            <button 
              onClick={handleContinue}
              className={cn(
                "w-full py-3 rounded-2xl font-bold text-white uppercase tracking-widest text-sm shadow-md active:translate-y-[2px] active:shadow-none transition-all",
                status === 'correct' ? "bg-[#58cc02] shadow-[#46a302]" : "bg-[#ff4b4b] shadow-[#ea2b2b]"
              )}
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
