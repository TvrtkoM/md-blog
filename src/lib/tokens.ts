import { sign, verify } from "jsonwebtoken";
import crypto from "crypto";

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

const algo = "aes-256-cbc";
const key = process.env.REFRESH_TOKEN_ENC_KEY!;

function encrypt(text: string) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algo, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift()!, "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(algo, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function encryptRefreshToken(token: string) {
  return encrypt(token);
}

export function decryptRefreshToken(token: string) {
  return decrypt(token);
}
