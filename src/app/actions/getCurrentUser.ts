import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import client from "@/libs/prismaDb";

export async function getSession() {
  return await getServerSession(authOptions);
}
export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, "Heloo Helo");
    if (!session?.user?.email) {
      console.log("no user found!");
      return null;
    }
    const currentUser = await client.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) return null;
    return { ...currentUser };
  } catch (error) {
    console.log(error);
    return null;
  }
}
