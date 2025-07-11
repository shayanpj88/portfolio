import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import createSlug from "@/util/createSlug";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedArticle = await prisma.article.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: createSlug(body.title),
        description: body.description,
        htmlContent: body.htmlContent,
        featureImage: body.featureImage,
      },
    });

    return NextResponse.json(updatedArticle);
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

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        slug: createSlug(body.title),
        htmlContent: body.htmlContent,
        description: body.description,
        featureImage: body.featureImage,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newArticle);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
