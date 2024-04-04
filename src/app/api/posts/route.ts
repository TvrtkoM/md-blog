import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prismaClient";

export async function GET(req: NextRequest) {
  const posts = await prismaClient.post.findMany();

  return NextResponse.json(posts, { status: 200 });
}
