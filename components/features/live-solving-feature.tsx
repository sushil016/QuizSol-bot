'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

export function LiveSolvingFeature() {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div variants={featureVariants}>
      <h3 className="text-2xl font-semibold mb-4">Live Solving Feature</h3>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-muted-foreground">
                Experience real-time question solving with our intuitive interface.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-mono text-lg">00:15:30</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-muted p-4 rounded-lg">
              <div className="space-y-2">
                <h4 className="font-semibold">Question 5 of 20</h4>
                <p className="text-sm text-muted-foreground">
                  What is the capital of France?
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    A. London
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    B. Berlin
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    C. Paris
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    D. Madrid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

