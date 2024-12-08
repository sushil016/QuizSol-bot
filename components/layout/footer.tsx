'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold">QuizMaster</h3>
            <p className="text-sm text-muted-foreground">
              Empowering learners through interactive practice and comprehensive assessments.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm hover:underline">Blog</Link></li>
              <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
              <li><Link href="/help" className="text-sm hover:underline">Help Center</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground"
          variants={item}
        >
          © {new Date().getFullYear()} QuizMaster. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
} 