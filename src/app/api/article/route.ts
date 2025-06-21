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

    const updatedArticle = await prisma.article.update({
      where: { id: body.id },
      data: {
        title: body.title,
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
        featureImage: body.featureImage,
        authorId: "cmbpl7pa10000w41sijiw9igk",
      },
    });

    return NextResponse.json(newArticle);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
