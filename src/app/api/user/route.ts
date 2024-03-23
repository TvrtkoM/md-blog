import { badRequestError, ErrorCode, invalidToken } from "@/lib/server-errors";
import { verifyAccessToken } from "@/lib/tokens";
import prismaClient from "@/prismaClient";
import omit from "lodash/omit";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;
  if (!accessToken) {
    return NextResponse.json(null, { status: 401 });
  }
  try {
    const payload = verifyAccessToken(accessToken);
    if (typeof payload !== "string" && payload.userId) {
      const { userId } = payload;
      const user = await prismaClient.user.findFirst({ where: { id: userId } });
      return NextResponse.json(omit(user, "password"), { status: 200 });
    } else {
      return invalidToken();
    }
  } catch {
    return invalidToken();
  }
}
