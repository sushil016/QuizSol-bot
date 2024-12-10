'use client'

import { motion } from 'framer-motion'
import { LiveSolvingFeature } from './live-solving-feature'
import { PDFRepositoryFeature } from './pdf-repository-feature'
import { PerformanceTrackingFeature } from './performance-tracking-feature'


export function FeaturesOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  return (
    <motion.section
      className="py-24 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-500/5 to-background" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            Powerful Features for Better Learning
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            Discover our comprehensive suite of tools designed to enhance your exam preparation journey
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="space-y-24">
          {/* Live Solving Feature */}
          <motion.div
            className="group"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <div className="gap-12 items-center max-w-7xl mx-auto border-2 border-dashed border-purple-500/50 rounded-lg p-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Interactive Live Solving
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Experience real-time question solving with our state-of-the-art interface. 
                  Practice under exam conditions and get instant feedback on your performance.
                </p>
                <LiveSolvingFeature />
              </div>
            </div>
          </motion.div>

          {/* PDF Repository Feature */}
          <motion.div
            className="group"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <div className="gap-12 items-center max-w-7xl mx-auto border-2 border-dashed border-purple-500/50 rounded-lg p-10 space-y-6">
              <div className="space-y-6">
                <div className="relative">
                  <PDFRepositoryFeature />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Comprehensive PDF Repository
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Access a vast collection of past papers, study materials, and practice sets. 
                  Download and study offline at your convenience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Performance Tracking Feature */}
          <motion.div
            className="group"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <div className="gap-12 items-center max-w-7xl mx-auto border-2 border-dashed border-purple-500/50 rounded-lg p-10 space-y-6">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Advanced Performance Analytics
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Track your progress with detailed analytics and insights. 
                  Identify your strengths and areas for improvement.
                </p>
              </div>
              <div className="relative group-hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative">
                  <PerformanceTrackingFeature />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

