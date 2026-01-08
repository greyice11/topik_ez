'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X } from 'lucide-react'
import Link from 'next/link'
import { updateXP } from '@/app/actions'

interface Card {
  id: string
  korean: string
  english: string
  level: string
}

export default function VocabPage({ cards }: { cards: Card[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = cards[index % cards.length]

  const handleNext = (correct: boolean) => {
    setDirection(correct ? 1 : -1)
    if (correct) {
      updateXP(10) // Client-side optmistic, but calls server
    }
    setTimeout(() => {
      setIndex((prev) => prev + 1)
      setIsFlipped(false)
      setDirection(0)
    }, 200)
  }

  if (!currentCard) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 flex items-center">
        <Link href="/">
           <ArrowLeft className="text-gray-500" />
        </Link>
        <div className="flex-1 bg-gray-200 h-3 rounded-full mx-4">
          <div 
            className="bg-green-500 h-full rounded-full transition-all duration-300" 
            style={{ width: `${((index % cards.length) / cards.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-lg font-bold text-gray-500 mb-8">Translate this</h2>
        
        <div className="relative w-full max-w-sm aspect-[4/5]">
          <AnimatePresence mode="wait">
             <motion.div
               key={currentCard.id}
               initial={{ x: 300 * direction, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -300 * direction, opacity: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 20 }}
               className="absolute inset-0 w-full h-full perspective-1000 cursor-pointer"
               onClick={() => setIsFlipped(!isFlipped)}
             >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                     style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  
                  {/* Front */}
                  <div className="absolute inset-0 bg-white border-2 border-gray-200 rounded-3xl shadow-xl flex flex-col items-center justify-center backface-hidden">
                    <span className="text-4xl font-bold text-gray-800">{currentCard.korean}</span>
                    <span className="text-sm text-gray-400 mt-4">{currentCard.level}</span>
                    <span className="text-xs text-gray-300 mt-8">Tap to flip</span>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-indigo-100 border-2 border-indigo-200 rounded-3xl shadow-xl flex flex-col items-center justify-center backface-hidden"
                       style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                    <span className="text-3xl font-bold text-indigo-700 text-center px-4">{currentCard.english}</span>
                  </div>
                </div>
             </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="p-6 border-t bg-white">
        <div className="flex justify-between items-center gap-4">
          <button 
            onClick={() => handleNext(false)}
            className="flex-1 py-4 rounded-xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
          >
            Pass
          </button>
          <button 
            onClick={() => handleNext(true)}
            className="flex-1 py-4 rounded-xl bg-green-500 text-white font-bold shadow-md border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all"
          >
            Got it!
          </button>
        </div>
      </footer>
    </div>
  )
}
