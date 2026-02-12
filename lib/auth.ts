import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { mockUsers, UserRole } from "./mock-data"

// Mock password pour la démo (en production, utiliser bcrypt)
// Chaque utilisateur a son propre mot de passe unique
const MOCK_PASSWORDS: Record<string, string> = {
  // Super Admin FinEd
  "admin@fined.app": "superadmin123",
  
  // Admins Partenaires
  "admin@ciaivert.sn": "admin_ciaivert123",
  "admin@microfinance.sn": "admin_microfinance123",
  
  // Clients CIAI Vert
  "user1@ciaivert.sn": "user1_ciaivert123",
  "user2@ciaivert.sn": "user2_ciaivert123",
  "user3@ciaivert.sn": "user3_ciaivert123",
  
  // Clients Microfinance Academy
  "user1@microfinance.sn": "user1_microfinance123",
  "user2@microfinance.sn": "user2_microfinance123",
  
  // Clients Sécurité Routière
  "user1@securite-routiere.sn": "user1_securite123",
  "user2@securite-routiere.sn": "user2_securite123",
  
  // Clients Green Tech Academy
  "user1@greentech.sn": "user1_greentech123",
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "demo-secret-key-change-in-production",
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock authentication - pas de vraie vérification de mot de passe
        const user = mockUsers.find((u) => u.email === credentials.email as string)

        if (!user) {
          return null
        }

        // Vérification mockée du mot de passe
        const expectedPassword = MOCK_PASSWORDS[credentials.email as string]
        if (expectedPassword !== credentials.password) {
          return null
        }

        if (user.status !== 'ACTIVE') {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.tenantId = (user as any).tenantId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.tenantId = token.tenantId as string | null
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // Page par défaut pour les clients
  },
})
