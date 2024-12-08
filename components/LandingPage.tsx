'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HomePage } from './HomePage';
import AboutUs from './AboutSection';
import { FeaturesOverview } from './features/features-overview';
import { UserTestimonials } from './features/user-testimonials';
import { ContactForm } from './ContactForm';

const features = [
  {
    title: 'Diverse Question Bank',
    description: 'Access a wide range of questions across multiple categories and difficulty levels',
    icon: '📚',
  },
  {
    title: 'Track Progress',
    description: 'Monitor your performance with detailed statistics and analytics',
    icon: '📊',
  },
  {
    title: 'Practice Mode',
    description: 'Learn at your own pace with unlimited practice sessions',
    icon: '🎯',
  },
  {
    title: 'Personalized Learning',
    description: 'Get recommendations based on your performance and learning patterns',
    icon: '🎓',
  },
];

export function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <HomePage />

      {/* Features Section with enhanced cards */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
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
                <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add the About Section here */}
      <AboutUs />
      <FeaturesOverview />
      <UserTestimonials />
      <ContactForm />
      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <div className="container mx-auto px-4 text-center relative">
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
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/register">Create Free Account</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
