'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Testimonial {
  name: string
  photo: string
  role: string
  quote: string
  achievement: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    photo: "/placeholder.svg?height=100&width=100",
    role: "Parent of a 5th grader",
    quote: "queSol transformed My child loves the quizzes and analytics. It makes studying fun! — Parent of a 5th-grader.",
    achievement: "My child is now scoring 90% in his school exams"
  },
  {
    name: "Michael Chen",
    photo: "/placeholder.svg?height=100&width=100",
    role: "10th grader",
    quote: "This helped me stay on top of my 10th-grade syllabus. — High School Student",
    achievement: "Now I am preparing for my 11th grade exams"
  },
  {
    name: "Priya Patel",
    photo: "/placeholder.svg?height=100&width=100",
    role: "12th grader",
    quote: "queSol's AI-driven practice papers were a game-changer for my JEE Mains prep. The personalized questions helped me focus on my weak areas. — College Student",
    achievement: "scored 98.81 percentile in JEE Mains without any coaching"
  },
  {
    name: "Alex Rodriguez",
    photo: "/placeholder.svg?height=100&width=100",
    role: "Business School Applicant",
    quote: "The AI recommendations saved me hours of revision time by targeting my weak areas. — College Student",
    achievement: "Achieved 750+ GMAT score"
  }
]

export function UserTestimonials() {
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState<Testimonial[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  const controls = useAnimation()

  useEffect(() => {
    setDuplicatedTestimonials([...testimonials, ...testimonials])
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2)
    }
  }, [duplicatedTestimonials])

  useEffect(() => {
    controls.start({
      x: -containerWidth,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }, [containerWidth, controls])

  const handleHoverStart = () => {
    controls.stop()
  }

  const handleHoverEnd = () => {
    controls.start({
      x: -containerWidth,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from our users who have achieved their goals with queSol&apos;s help.
        </p>
      </div>
      <motion.div
        ref={containerRef}
        className="flex"
        style={{ x }}
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.name}-${index}`}
            className="flex-shrink-0 w-[300px] mx-4"
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center pt-3">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={testimonial.photo} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{testimonial.role}</p>
                <blockquote className="text-sm italic mb-4">{`"${testimonial.quote}"`}</blockquote>
                <p className="text-sm font-medium text-primary">{testimonial.achievement}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

