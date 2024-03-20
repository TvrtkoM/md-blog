import { userExistsError, validationError } from "@/lib/server-errors";
import prismaClient from "@/prismaClient";
import { RegisterUserSchema } from "@/zod-schemas/user";
import { hash } from "bcrypt";
import omit from "lodash/omit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const result = await RegisterUserSchema.safeParseAsync(data);

  if (!result.success) {
    return validationError(result.error.issues);
  } else {
    const existingUser = await prismaClient.user.findFirst({
      where: { email: result.data.email }
    });

    if (existingUser) {
      return userExistsError();
    }

    const user = await prismaClient.user.create({
      data: {
        ...omit(result.data, "confirmPassword"),
        password: await hash(result.data.password, 12)
      }
    });

    return NextResponse.json(omit(user, "password"), {
      status: 201
    });
  }
}
