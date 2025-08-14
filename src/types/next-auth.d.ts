import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      odooUserId?: number
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    odooUserId?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    odooUserId?: string | number
  }
} 