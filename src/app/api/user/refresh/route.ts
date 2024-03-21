import { badRequestError, ErrorCode, invalidToken } from "@/lib/server-errors";
import { generateAccessToken, verifyRefreshToken } from "@/lib/tokens";
import prismaClient from "@/prismaClient";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return invalidToken();
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    if (typeof payload !== "string") {
      const { userId } = payload;
      const dbRefreshTokens = await prismaClient.refreshToken.findMany({
        where: { userId }
      });
      if (
        dbRefreshTokens.findIndex((tok) => tok.token === refreshToken) !== -1
      ) {
        const newAccessToken = generateAccessToken(userId);
        cookieStore.set("token", newAccessToken);
        return NextResponse.json({}, { status: 200 });
      } else {
        return NextResponse.json({}, { status: 403 });
      }
    } else {
      return badRequestError("bad request", ErrorCode.GENERAL_BAD_REQUEST);
    }
  } catch {
    return invalidToken();
  }
}
