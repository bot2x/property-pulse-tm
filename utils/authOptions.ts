import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth"
import connectDB from "@/dbconfig/database";
import User from "@/models/User";

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
            //connect to the db.
            await connectDB;

            //check if the user already exists.
            const userExists = await User.findOne({email : profile?.email});

            console.log(profile);
            //if user does not exist. Add it to the db.
            if (!userExists) {
                //truncate the username
                const username = profile?.name?.slice(0,20) || "User"; //limit the username to 20 char.
                
                console.log({
                    "username set" : username
                })

                const res = await User.create({
                    email : profile?.email,
                    username : "SomeName",
                    image : profile?.picture //check picture as well.
                });
                console.log({
                    DEBUG : res
                })

                console.log("this is after the db create call.");
            }

            //Need to add the case where the user insertion fails.
            //return true to continue signin.
            return true;
        },
        //Modifies session object
        // async sessionn({ session }: { session: unknown}) {
        async session({ session }) {
            console.log({
                DEBUG_session : session
            })
            //get the user from the db.
            const user = await User.findOne({
                email : session.user?.email
            });

            //Need to handle the case when the user does not exists in database.
            //set the session id to user's id. The type for session seems to have changed.
            if (session.user) { 
                session.user.id = user._id
            } else {
                //when will this happen ?
                session.user = {
                    id : user._id,
                    name : "User",
                    email : "",
                    image : ""
                };
            }
            return session;
        }
    }
};