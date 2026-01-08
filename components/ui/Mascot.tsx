"use client";

import { motion } from "framer-motion";

export const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "sad" | "excited" }) => {
  return (
    <div className="relative w-24 h-24">
      {/* Head */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-20 h-20 bg-orange-400 rounded-full border-4 border-orange-600 relative overflow-hidden shadow-lg mx-auto"
      >
        {/* Ears */}
        <div className="absolute -top-1 left-0 w-6 h-6 bg-orange-500 rounded-full border-2 border-orange-700" />
        <div className="absolute -top-1 right-0 w-6 h-6 bg-orange-500 rounded-full border-2 border-orange-700" />

        {/* Stripes */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-black rounded-b-full opacity-80" />
        <div className="absolute top-3 left-3 w-3 h-2 bg-black rounded-full opacity-80 rotate-45" />
        <div className="absolute top-3 right-3 w-3 h-2 bg-black rounded-full opacity-80 -rotate-45" />

        {/* Eyes */}
        <div className="absolute top-8 left-4 w-3 h-3 bg-black rounded-full">
           <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
        </div>
        <div className="absolute top-8 right-4 w-3 h-3 bg-black rounded-full">
           <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
        </div>

        {/* Nose/Mouth */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-full" />
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-3 border-b-2 border-black rounded-b-full" />

      </motion.div>
      
      {/* Speech Bubble */}
      {emotion === "excited" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-4 -right-8 bg-white px-3 py-1 rounded-xl border-2 border-gray-200 text-xs font-bold"
        >
          Let's go!
        </motion.div>
      )}
    </div>
  );
};
