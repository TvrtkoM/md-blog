import {
  incorrectPasswordError,
  userDoesNotExistError,
  validationError
} from "@/lib/server-errors";
import {
  encryptRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  setTokenToCookieStore
} from "@/lib/tokens";
import prismaClient from "@/prismaClient";
import { LoginUserSchema } from "@/zod-schemas/user";
import { compare } from "bcrypt";
import { omit } from "lodash";
import { cookies } from "next/headers";
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

    const token = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const encryptedRefreshToken = encryptRefreshToken(refreshToken);

    const cookieStore = cookies();

    setTokenToCookieStore("token", token, cookieStore);
    setTokenToCookieStore("refreshToken", refreshToken, cookieStore);

    const oldRefreshToken = await prismaClient.refreshToken.findFirst({
      where: { userId: user.id }
    });

    if (oldRefreshToken) {
      await prismaClient.refreshToken.update({
        where: { userId: user.id },
        data: { token: encryptedRefreshToken }
      });
    } else {
      await prismaClient.refreshToken.create({
        data: {
          token: encryptedRefreshToken,
          userId: user.id
        }
      });
    }

    return NextResponse.json({
      ...omit(user, "password")
    });
  }
}
