import { verifyAccessToken } from "@/lib/tokens";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { badRequestError, ErrorCode, invalidToken } from "@/lib/server-errors";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;
  if (!accessToken) {
    return NextResponse.json(null, { status: 401 });
  }
  try {
    const payload = verifyAccessToken(accessToken);
    if (typeof payload !== "string" && payload.userId) {
      const { userId } = payload;
    } else {
      return invalidToken();
    }
  } catch {
    return invalidToken();
  }
}
