"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomePage } from "./HomePage";
import AboutUs from "./AboutSection";
import { FeaturesOverview } from "./features/features-overview";
import { UserTestimonials } from "./features/user-testimonials";
import { ContactForm } from "./ContactForm";

const features = [
  {
    title: "Diverse Question Bank",
    description:
      "From foundational quizzes to advanced mock tests, access resources tailored to your grade or exam.",
    icon: "📚",
  },
  {
    title: "Personalized AI-Driven Insights",
    description:
      "Track progress, get recommendations, and improve based on your strengths and weaknesses.",
    icon: "📊",
  },
  {
    title: "Interactive Practice Modes",
    description:
      "Solve real-time questions with a timer or study offline with PDFs.",
    icon: "🎯",
  },
  {
    title: "Comprehensive Progress Tracking",
    description:
      "Monitor your journey with detailed analytics, time tracking, and skill insights.",
    icon: "🎓",
  },
];

export function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      <HomePage />
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Our Platform?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10 bg-background backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesOverview />
      <AboutUs />
      <UserTestimonials />
      <ContactForm />
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <div className="container mx-auto px-4 max-w-7xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of learners who are improving their skills with us
            </p>
            {!session ? (
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="/register">Create Free Account</Link>
              </Button>
            ) : (
              <Link href="/dashboard">
                <button
                  className="p-2 bg-gradient-to-r from-orange-500 via-purple-500 to-yellow-500 text-white rounded-full text-sm 
                      [background-size:300%] animate-moving-gradient px-6"
                >
                  Go to Dashboard
                </button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
