import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';


export const authOptions : AuthOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)