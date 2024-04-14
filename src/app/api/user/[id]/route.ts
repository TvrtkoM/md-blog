import prismaClient from "@/prismaClient";
import omit from "lodash/omit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    const user = await prismaClient.user.findFirst({ where: { id } });
    return NextResponse.json(omit(user, "password"), { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
