import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        bio: body.bio ?? null,
        introductionTitle: body.introductionTitle ?? null,
        introductionSummary: body.introductionSummary ?? null,
        profileImage: body.profileImage ?? null,
        social: body.social ?? {},
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
