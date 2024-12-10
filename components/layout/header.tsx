'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useTheme } from "next-themes";

export function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          QuizSoln...
        </Link>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth buttons and Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-foreground/80 border rounded-md px-3 py-2">
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                        <AvatarFallback>
                          {session.user.name
                            ? session.user.name.charAt(0).toUpperCase()
                            : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/register">
                  <button className="p-2 bg-gradient-to-r from-orange-500 via-purple-500 to-yellow-500 text-white rounded-lg text-sm 
                    [background-size:300%] animate-moving-gradient">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b shadow-lg lg:hidden z-50">
            <nav className="flex flex-col p-4 space-y-4">
              {session ? (
                <>
                  <div className="flex items-center space-x-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback>
                        {session.user.name
                          ? session.user.name.charAt(0).toUpperCase()
                          : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" className="px-2 py-1 hover:bg-accent rounded">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="px-2 py-1 hover:bg-accent rounded">
                    Profile
                  </Link>
                  <Link href="/settings" className="px-2 py-1 hover:bg-accent rounded">
                    Settings
                  </Link>
                  <button
                    className="px-2 py-1 text-red-600 hover:bg-accent rounded text-left"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <button className="w-full p-2 bg-gradient-to-r from-orange-500 via-purple-500 to-yellow-500 text-white rounded-lg text-sm 
                      [background-size:300%] animate-moving-gradient">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}