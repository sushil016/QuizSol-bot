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
    role: "Medical Student",
    quote: "queSol transformed my MCAT prep. The live solving feature helped me improve my timing significantly.",
    achievement: "Scored in the 95th percentile on MCAT"
  },
  {
    name: "Michael Chen",
    photo: "/placeholder.svg?height=100&width=100",
    role: "Law School Applicant",
    quote: "The extensive PDF repository was a game-changer for my LSAT preparation. I had access to years of past papers.",
    achievement: "Admitted to top 3 law schools"
  },
  {
    name: "Priya Patel",
    photo: "/placeholder.svg?height=100&width=100",
    role: "Engineering Graduate",
    quote: "The performance tracking feature helped me identify and improve my weak areas before the GRE.",
    achievement: "Secured full scholarship for Masters program"
  },
  {
    name: "Alex Rodriguez",
    photo: "/placeholder.svg?height=100&width=100",
    role: "Business School Applicant",
    quote: "queSol's comprehensive approach to GMAT prep gave me the confidence I needed on test day.",
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
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
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

