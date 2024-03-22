import { badRequestError, ErrorCode, invalidToken } from "@/lib/server-errors";
import prismaClient from "@/prismaClient";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("token")?.value;

  try {
    if (!refreshToken && !accessToken) {
      return NextResponse.json({}, { status: 204 });
    }
    if (refreshToken) {
      const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
      if (typeof payload === "string") {
        return badRequestError("bad request", ErrorCode.GENERAL_BAD_REQUEST);
      } else {
        const { userId } = payload;
        await prismaClient.refreshToken.delete({
          where: { userId }
        });
        cookieStore.delete("refreshToken");
      }
    }
    if (accessToken) {
      cookieStore.delete("token");
    }
    return NextResponse.json(null, { status: 202 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
