import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Demo in-memory user (replace with DB later)
const demoUser = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  password: "demo1234", // DO NOT use in production
}

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
        const parsed = schema.safeParse(credentials)
        if (!parsed.success) return null
        const { email, password } = parsed.data
        // Simple in-memory check
        if (email === demoUser.email && password === demoUser.password) {
          return { id: demoUser.id, name: demoUser.name, email: demoUser.email }
        }
        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
})

export { handler as GET, handler as POST }