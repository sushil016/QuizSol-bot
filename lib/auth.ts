import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          console.log("Found user:", user);

          if (!user) {
            console.log("No user found");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password ?? ''
          );

          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      console.log("Session callback - session:", session);
      return session;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback - user:", user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (!user.email) return false;
        
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create new user if doesn't exist
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email.split('@')[0],
              role: 'USER',
              password: '', // Empty password for OAuth users
            },
          });
          
          // Update the user object with the new user's data
          user.id = newUser.id;
          user.role = newUser.role;
        } else {
          // Update the user object with existing user's data
          user.id = existingUser.id;
          user.role = existingUser.role;
        }
      }
      return true;
    },
  }
};