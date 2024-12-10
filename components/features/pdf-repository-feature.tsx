'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, FileText } from 'lucide-react'

export function PDFRepositoryFeature() {
  const featureVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const pdfCategories = [
    { year: 2023, type: 'Final Exam' },
    { year: 2022, type: 'Mid-term' },
    { year: 2021, type: 'Practice Set' },
    { year: 2020, type: 'Final Exam' },
  ]

  return (
    <motion.div variants={featureVariants}>
      <h3 className="text-2xl font-semibold mb-4">PDF Repository</h3>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-muted-foreground">
                Access a vast collection of categorized exam papers and practice sets.
              </p>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search papers..." className="pl-8" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Recent Papers</h4>
              <ul className="space-y-2">
                {pdfCategories.map((category, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      {category.year} - {category.type}
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
