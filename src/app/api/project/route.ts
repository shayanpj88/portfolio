import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import createSlug from "@/util/createSlug";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedProject = await prisma.project.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: createSlug(body.title),
        role: body.role,
        startedAt: body.startedAt,
        endedAt: body.endedAt,
        htmlContent: body.htmlContent,
        featureImage: body.featureImage,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        slug: createSlug(body.title),
        role: body.role,
        startedAt: body.startedAt,
        endedAt: body.endedAt,
        htmlContent: body.htmlContent,
        featureImage: body.featureImage,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
