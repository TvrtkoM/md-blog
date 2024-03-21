import { sign, verify } from "jsonwebtoken";

export function generateAccessToken(userId: number, expiresIn?: string) {
  expiresIn = expiresIn ?? "5m";
  return sign(
    {
      type: "access",
      userId
    },
    process.env.JWT_SECRET!,
    { expiresIn }
  );
}

export function generateRefreshToken(userId: number) {
  return sign(
    {
      type: "refresh",
      userId
    },
    process.env.REFRESH_TOKEN_SECRET!
  );
}

export function verifyAccessToken(token: string) {
  return verify(token, process.env.JWT_SECRET!);
}

export function verifyRefreshToken(token: string) {
  return verify(token, process.env.REFRESH_TOKEN_SECRET!);
}
