import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { odooExecuteKw } from "./odooClient";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      try {
        // Check if user exists in Odoo
        const existingUsers = await odooExecuteKw(
          'res.partner', 
          'search_read',
          [[['email', '=', user.email]]],
          { fields: ['id', 'name', 'email'] }
        );
        
        if (existingUsers.length === 0) {
          // Create new user in Odoo
          const partnerId = await odooExecuteKw('res.partner', 'create', [{
            name: user.name || user.email,
            email: user.email,
            is_company: false,
            customer_rank: 1,
          }]);
          
          // Add to portal users group
          try {
            await odooExecuteKw('res.users', 'create', [{
              partner_id: partnerId,
              login: user.email,
              active: true,
              groups_id: [[4, 9]], // Portal group ID (typically 9)
            }]);
          } catch (error) {
            console.warn('Could not create portal user:', error);
          }
        }
        
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return true; // Allow sign in even if Odoo sync fails
      }
    },
    
    async jwt({ token, user, account }) {
      if (account && user) {
        // Get user from Odoo
        try {
          const odooUsers = await odooExecuteKw(
            'res.partner',
            'search_read',
            [[['email', '=', user.email]]],
            { fields: ['id', 'name', 'email'] }
          );
          
          if (odooUsers.length > 0) {
            token.odooUserId = odooUsers[0].id;
            token.odooUserName = odooUsers[0].name;
          }
        } catch (error) {
          console.error('Error fetching user from Odoo:', error);
        }
        
        token.provider = account.provider;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.provider = token.provider as string;
        session.user.odooUserId = token.odooUserId as number;
        session.user.odooUserName = token.odooUserName as string;
      }
      
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in with ${account?.provider}`);
    },
  },
  
  debug: process.env.NODE_ENV === 'development',
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
      odooUserId?: number;
      odooUserName?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    odooUserId?: number;
    odooUserName?: string;
  }
}