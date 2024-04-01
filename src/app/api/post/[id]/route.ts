import { postNotFound } from "@/lib/server-errors";
import prismaClient from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const post = await prismaClient.post.findFirst({
      where: { id: Number(id) }
    });
    if (!post) {
      return postNotFound();
    }
    return NextResponse.json(post, { status: 200 });
  } catch {
    return postNotFound();
  }
}
