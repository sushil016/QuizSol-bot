'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
 // You'll need to add this animation file

export function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side content (60%) */}
          <motion.div 
            className="w-full md:w-[60%] space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Master Your Exams: Solve Past Papers Like a Pro!
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Access NEET, JEE, GATE, and other competitive exam question papers. 
              Solve them live, track your progress, and ace your preparation.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {!session ? (
                <>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/register">Start Solving Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/pyqs">Download PYQs</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/pyqs">Download PYQs</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right side animation (40%) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <video
                src="https://ouch-cdn2.icons8.com/tNpkevHCK4281wiQGQrGuP0T-cXgcHx7NGx3X2XCAkA/skp:webm/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy92aWRlb3Mv/MjkvMzNiN2M2NmMt/ZmIzYS00ZTliLTg5/MTktNmRiYzA2YzRi/OWZjLndlYm0.webm"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover rounded-lg shadow-2xl w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 