import { getAccessTokenDataOrError } from "@/lib/tokens";
import prismaClient from "@/prismaClient";
import omit from "lodash/omit";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const data = getAccessTokenDataOrError(cookies());
  if (typeof data === "number") {
    const userId = data;
    const user = await prismaClient.user.findFirst({ where: { id: userId } });
    return NextResponse.json(omit(user, "password"), { status: 200 });
  } else {
    return data;
  }
}
