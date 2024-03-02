import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth"


export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ],
    callbacks : {
        //Invoked on successful sign in
        // async signIn({ profile }) {
        async signIn({ profile }){  
        //The post oauth logic will come here.
            return false;
        },
        //Modifies session object
        // async sessionn({ session }: { session: unknown}) {
        async session({ session }) {
        //
        //
        }
    }
};