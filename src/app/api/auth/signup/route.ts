// app/api/auth/signup/route.ts
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { prisma }  from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, username, password } = body

  if (!email || !username || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 })
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  })

  if (existingUser) {
    return NextResponse.json({ error: "Email or username already exists." }, { status: 400 })
  }

  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      firstName: "", // You can collect these later
      lastName: "",
    }
  })

  return NextResponse.json({ message: "User created" })
}
