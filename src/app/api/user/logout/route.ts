import prismaClient from "@/prismaClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("token")?.value;

  if (!refreshToken && !accessToken) {
    return NextResponse.json({}, { status: 204 });
  }
  if (refreshToken) {
    await prismaClient.refreshToken.delete({ where: { token: refreshToken } });
    cookieStore.delete("refreshToken");
  }
  if (accessToken) {
    cookieStore.delete("token");
  }
  return NextResponse.json({}, { status: 202 });
}
