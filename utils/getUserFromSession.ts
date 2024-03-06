import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getUserFromSession = async () => {
    try {
        const session = await getServerSession(authOptions);

        //if session or the user in the session is missing, return null.
        if (!session || !session.user) {
            return null;
        }

        return {
            user: session.user,
            userId: session.user.id
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};