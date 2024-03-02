import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions); //TODO : sort out the type issue.

export {handler as GET, handler as POST};