'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function PerformanceTrackingFeature() {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const performanceStats = [
    { label: 'Questions Attempted', value: 150, max: 200 },
    { label: 'Accuracy', value: 75, max: 100 },
    { label: 'Time per Question', value: 45, max: 60 },
    { label: 'Overall Progress', value: 60, max: 100 },
  ]

  return (
    <motion.div variants={featureVariants}>
      <h3 className="text-2xl font-semibold mb-4">Performance Tracking</h3>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Track your progress and improve your performance with detailed analytics.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {performanceStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span>{stat.label}</span>
                    <span className="font-semibold">
                      {stat.value}/{stat.max}
                    </span>
                  </div>
                  <Progress value={(stat.value / stat.max) * 100} />
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

