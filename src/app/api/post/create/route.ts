import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function POST() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;
  if (!accessToken) {
    return NextResponse.json(null, { status: 401 });
  }
}
