import {
  incorrectPasswordError,
  userDoesNotExistError,
  validationError
} from "@/lib/server-errors";
import prismaClient from "@/prismaClient";
import { LoginUserSchema } from "@/zod-schemas/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { omit } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const result = await LoginUserSchema.safeParseAsync(data);

  if (!result.success) {
    return validationError(result.error.issues);
  } else {
    const user = await prismaClient.user.findFirst({
      where: { email: result.data.email }
    });
    if (!user) {
      return userDoesNotExistError();
    }
    const passwordMatch = await compare(result.data.password, user.password);
    if (!passwordMatch) {
      return incorrectPasswordError();
    }

    const token = sign(
      {
        type: "access",
        userId: user.id
      },
      process.env.JWT_SECRET!,
      { expiresIn: "5m" }
    );

    return NextResponse.json({ user: omit(user, "password"), token });
  }
}
