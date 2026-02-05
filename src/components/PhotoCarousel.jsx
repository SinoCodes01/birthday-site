"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/Ov1.jpg",
  "/Ov2.jpg", 
  "/Ov3.jpg",
  "/Ov4.jpg",
]

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

export default function PhotoCarousel() {
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = Math.abs(page % images.length)

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  // Auto-swiping effect
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1) // Advance to the next image
    }, 3000) // Change image every 3 seconds
    return () => clearInterval(interval)
  }, [page]) // Re-run effect when `page` changes to reset interval

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="w-full max-w-2xl mx-auto mt-8 relative"
    >
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Ovayo, Looking Absolutely Stunning! ✨</h2>
      <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl border-2 border-rose-200">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt={`Moment ${imageIndex + 1}`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="bg-white bg-opacity-70 rounded-full p-2 shadow-md text-pink-500 hover:bg-opacity-90 transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="bg-white bg-opacity-70 rounded-full p-2 shadow-md text-pink-500 hover:bg-opacity-90 transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
