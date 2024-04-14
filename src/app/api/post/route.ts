import {
  noPostIdSupplied,
  postNotFound,
  validationError
} from "@/lib/server-errors";
import { getAccessTokenDataOrError } from "@/lib/tokens";
import prismaClient from "@/prismaClient";
import { PostSchema } from "@/zod-schemas/post";
import omit from "lodash/omit";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import shortUUID from "short-uuid";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const userData = getAccessTokenDataOrError(cookies());
  if (typeof userData === "number") {
    const userId = userData;
    const data = await req.json();

    const postData = await PostSchema.safeParseAsync(data);

    if (!postData.success) {
      return validationError(postData.error.issues);
    } else {
      const slug = `${slugify(postData.data.title, {
        strict: true
      })}-${shortUUID.generate()}`;
      const post = await prismaClient.post.create({
        data: {
          ...postData.data,
          slug,
          userId
        }
      });
      return NextResponse.json(post, { status: 201 });
    }
  } else {
    return userData;
  }
}

export async function PUT(req: NextRequest) {
  const userData = getAccessTokenDataOrError(cookies());
  if (typeof userData === "number") {
    const userId = userData;
    const data = await req.json();

    const postData = await PostSchema.safeParseAsync(data);

    if (!postData.success) {
      return validationError(postData.error.issues);
    } else {
      const { id, title } = postData.data;
      if (id == null) {
        return noPostIdSupplied();
      }
      const existingPost = await prismaClient.post.findFirst({
        where: { id }
      });
      if (!existingPost) {
        return postNotFound();
      }
      let slug = existingPost.slug;
      if (existingPost.title !== title) {
        slug = `${slugify(title, {
          strict: true
        })}-${shortUUID.generate()}`;
      }
      const post = await prismaClient.post.update({
        where: { id },
        data: {
          ...omit(postData.data, "id"),
          userId,
          slug
        }
      });
      return NextResponse.json(post, { status: 201 });
    }
  } else {
    return userData;
  }
}
