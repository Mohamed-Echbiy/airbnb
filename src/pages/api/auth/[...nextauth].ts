import client from "@/libs/prismaDb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("the password and email are not provided");
          throw new Error("Invalid Credentials");
        }

        const user = await client?.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          console.log("the password is not passed");
          throw new Error("Invalid Credentials");
        }

        const isCorrectPass =
          credentials?.password &&
          user?.hashedPassword &&
          (await bcrypt.compare(credentials?.password, user?.hashedPassword));
        if (!isCorrectPass) {
          console.log("the password is not correct");

          throw Error("Invalid Credentials");
        }
        console.log("the user should be logged here");
        // note returning a null here will cause an error
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
export default NextAuth(authOptions);
