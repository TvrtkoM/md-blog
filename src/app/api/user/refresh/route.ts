import { badRequestError, ErrorCode, invalidToken } from "@/lib/server-errors";
import {
  decryptRefreshToken,
  encryptRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  setTokenToCookieStore,
  verifyRefreshToken
} from "@/lib/tokens";
import prismaClient from "@/prismaClient";
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
      const dbRefreshToken = await prismaClient.refreshToken.findFirst({
        where: { userId }
      });
      if (dbRefreshToken) {
        const decryptedRefreshToken = decryptRefreshToken(dbRefreshToken.token);
        if (decryptedRefreshToken !== refreshToken) {
          return NextResponse.json(null, { status: 401 });
        }

        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        const newEncryptedRefreshToken = encryptRefreshToken(newRefreshToken);

        await prismaClient.refreshToken.update({
          where: { token: dbRefreshToken.token },
          data: {
            token: newEncryptedRefreshToken
          }
        });

        setTokenToCookieStore("token", newAccessToken, cookieStore);
        setTokenToCookieStore("refreshToken", newRefreshToken, cookieStore);

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
