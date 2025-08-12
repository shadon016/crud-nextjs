import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/models/schemas/userSchema.js";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isMatch) throw new Error("Invalid email or password");

            // শুধুমাত্র দরকারি ডেটা রিটার্ন করো
            return {
              id: user._id,
              name: user.username,
              email: user.email,
            };
          }
        } catch (err) {
          throw new Error("wrong email and password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // প্রথম লগইনের সময় user থেকে id নেওয়া
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // সেশনে id যোগ
      }
      return session;
    },
  },
});
