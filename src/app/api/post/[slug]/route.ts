import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prismaClient";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const post = await prismaClient.post.findFirst({
    where: {
      slug
    }
  });

  return NextResponse.json(post, { status: 200 });
}
