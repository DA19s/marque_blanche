import "next-auth"

type UserRole = "SUPER_ADMIN" | "ADMIN_PARTNER" | "COACH" | "USER"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: UserRole
      tenantId: string | null
    }
  }

  interface User {
    role: UserRole
    tenantId: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    tenantId: string | null
  }
}
