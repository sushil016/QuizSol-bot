'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-background/5" />
            
            <CardHeader className="text-center relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6 rounded-full"
                viewport={{ once: true }}
              />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Contact Us
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Have questions? We&apos;d love to hear from you.
              </p>
            </CardHeader>

            <CardContent className="relative">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="bg-background/50 border-primary/10 focus:border-primary transition-colors rounded-2xl"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="bg-background/50 border-primary/10 focus:border-primary transition-colors rounded-2xl"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      className="bg-background/50 border-primary/10 focus:border-primary transition-colors rounded-2xl"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      required
                      className="min-h-[150px] bg-background/50 border-primary/10 focus:border-primary transition-colors resize-none rounded-2xl"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative group">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    <div className="relative mt-[1px] overflow-hidden">
                      <div 
                        className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 