'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, XCircle, Flag } from 'lucide-react'
import Link from 'next/link'
import { updateXP } from '@/app/actions'
import { Mascot } from '@/components/ui/Mascot'
import { cn } from '@/lib/utils'

interface Card {
  id: string
  korean: string
  english: string
  level: string
}

export default function VocabClient({ cards }: { cards: Card[] }) {
  const [index, setIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [hearts, setHearts] = useState(5)
  
  const currentCard = cards[index % cards.length]

  // Generate options (1 correct + 2 random wrong ones)
  const options = useMemo(() => {
    if (!cards.length) return []
    const otherCards = cards.filter(c => c.id !== currentCard.id)
    const randomWrong = otherCards.sort(() => 0.5 - Math.random()).slice(0, 2)
    const allOptions = [currentCard, ...randomWrong]
    return allOptions.sort(() => 0.5 - Math.random()) // Shuffle
  }, [currentCard, cards])

  // Play sound effect (simulated function)
  const playSound = (type: 'correct' | 'wrong') => {
    // In a real app, use Audio API here
  }

  const handleCheck = async () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === currentCard.id
    if (isCorrect) {
      setStatus('correct')
      playSound('correct')
      await updateXP(10) 
    } else {
      setStatus('wrong')
      playSound('wrong')
      setHearts(h => Math.max(0, h - 1))
    }
  }

  const handleContinue = () => {
    setStatus('idle')
    setSelectedOption(null)
    setIndex(prev => prev + 1)
  }

  if (!cards.length) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Mascot emotion="sad" />
      <p className="font-bold text-xl text-gray-500">No cards found!</p>
      <Link href="/" className="btn-primary w-auto">Go Home</Link>
    </div>
  )

  const progress = ((index % cards.length) / cards.length) * 100

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
        <h2 className="text-2xl font-bold text-gray-700 mb-8">
          Select the correct meaning
        </h2>

        {/* The Question Card (Mascot + Bubble) */}
        <div className="flex items-center gap-4 mb-8">
           <Mascot emotion={status === 'correct' ? 'happy' : status === 'wrong' ? 'sad' : 'happy'} />
           <div className="relative border-2 border-gray-200 p-4 rounded-2xl pr-8 bubble-left">
             <span className="text-lg font-bold text-gray-700">{currentCard.korean}</span>
             <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45" />
           </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id
            const showCorrect = status !== 'idle' && opt.id === currentCard.id
            const showWrong = status === 'wrong' && isSelected && opt.id !== currentCard.id

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
                key={opt.id}
                disabled={status !== 'idle'}
                onClick={() => setSelectedOption(opt.id)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left font-bold text-lg flex justify-between items-center transition-all",
                  borderClass, bgClass, textClass
                )}
              >
                <span>{opt.english}</span>
                {/* Number Key Hint (1, 2, 3) could go here */}
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
                Correct answer: {currentCard.english}
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
