import prismaClient from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    return NextResponse.json(true, { status: 200 });
  } else {
    return NextResponse.json(false, { status: 200 });
  }
}
