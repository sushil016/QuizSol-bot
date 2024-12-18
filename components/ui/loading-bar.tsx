"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-[9999]"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ 
        scaleX: 1, 
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
    >
      <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-pulse" />
    </motion.div>
  )
} 