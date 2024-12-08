'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-primary/10 bg-background/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
              <p className="text-muted-foreground mt-2">
                Have questions? We&apos;d love to hear from you.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="bg-background"
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
                      className="bg-background"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      className="bg-background"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      required
                      className="min-h-[150px] bg-background"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 