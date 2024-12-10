'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get in Touch
        </motion.h1>

        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xl text-muted-foreground">
            Have questions? Wed love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">support@solutionbot.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">Abc address</p>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
} 