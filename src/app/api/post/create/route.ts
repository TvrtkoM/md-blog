import { validationError } from "@/lib/server-errors";
import { getAccessTokenDataOrError } from "@/lib/tokens";
import { PostSchema } from "@/zod-schemas/post";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prismaClient";

export async function POST(req: NextRequest) {
  const userData = getAccessTokenDataOrError(cookies());
  if (typeof userData === "number") {
    const userId = userData;
    const data = await req.json();

    const postData = await PostSchema.safeParseAsync(data);

    if (!postData.success) {
      return validationError(postData.error.issues);
    } else {
      const post = await prismaClient.post.create({
        data: {
          content: postData.data.content,
          userId
        }
      });
      return NextResponse.json(post, { status: 201 });
    }
  } else {
    return userData;
  }
}
