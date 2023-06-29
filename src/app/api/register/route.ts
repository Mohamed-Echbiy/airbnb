import client from "@/libs/prismaDb";
import bcrypt from "bcrypt";
import {NextResponse} from "next/server"
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await client.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });
  return NextResponse.json(user)
}
