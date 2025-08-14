import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.odooUserId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.odooUserId) {
        session.user.id = token.odooUserId as string
        session.user.odooUserId = token.odooUserId as number
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
})

export { handler as GET, handler as POST } 