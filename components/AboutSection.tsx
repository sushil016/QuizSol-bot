'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <main className="container px-4 py-16 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-16"
      >
        {/* Hero Section */}
        <motion.h1 
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
                     animate-gradient-x tracking-tight"
          variants={itemVariants}
        >
          About Us / How It Works
        </motion.h1>
        
        {/* What We Offer Section */}
        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-semibold mb-12 text-center dark:text-white"
            variants={itemVariants}
          >
            What We Offer
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {offerItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-lg border border-purple-500/20 
                               transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20
                               hover:border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-purple-400 group-hover:text-purple-300
                                        transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-semibold mb-12 text-center dark:text-white"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.div 
            className="grid gap-6 relative"
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute -left-4 top-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500
                              rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="ml-8 p-6 bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500/20
                              hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl font-semibold mb-12 text-center dark:text-white"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border border-purple-500/20 rounded-lg overflow-hidden
                               hover:border-purple-500/50 transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium 
                                                text-purple-400 hover:text-purple-300
                                                data-[state=open]:bg-purple-500/5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </section>
      </motion.div>
    </main>
  )
}

const offerItems = [
  {
    title: "AI-Driven Learning experience",
    description: "A complete platform for students of all ages—whether you're preparing for school exams, college tests, or competitive challenges."
  },
  {
    title: "Live Solving Interface",
    description: "Solve papers in real-time with our interactive interface, complete with step-by-step solutions."
  },
  {
    title: "Performance Tracking",
    description: "Monitor your progress over time with detailed analytics and performance insights."
  }
]

const steps = [
  {
    title: "Select your grade or exam type.",
    description: ""
  },
  {
    title: " Choose from live practice, custom quizzes, or PDF downloads.",
    description: "Choose between solving the paper online or downloading it for offline practice."
  },
  {
    title: "Receive personalized insights and AI recommendations after solving",
    description: ""
  },
  {
    title: "Track your long-term progress with in-depth analytics.",
    description: ""
  }
]

const faqs = [
  {
    question: "Is this free to use?",
    answer: "We offer both free and premium features. Basic access to live Solving and past papers is free, while advanced features like AI recommendations may require a subscription."
  },
  {
    question: "How do I track my performance?",
    answer: "After solving papers, your performance data is automatically recorded. You can view detailed analytics, including scores, time spent, and areas for improvement, in your user dashboard."
  },
  {
    question: "How does the AI customize practice papers?",
    answer: "The AI analyzes (our machine learning model) your performance data and generates personalized practice papers that focus on your areas of strength and weakness using the latest exam patterns."
  },
  {
    question: "Can I use this platform on my mobile device?",
    answer: "Yes, our platform is fully responsive and works on desktops, tablets, and smartphones, allowing you to study on the go."
  }
]

