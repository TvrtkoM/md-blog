import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

export enum ErrorCode {
  USER_ALREADY_EXISTS = 1001,
  USER_DOES_NOT_EXIST = 1002,
  USER_INCORRECT_PASSWORD = 1003,
  VALIDATION_ERROR = 2001,
  GENERAL_BAD_REQUEST = 3001,
  INVALID_TOKEN = 4001
}

export interface ErrorJson {
  message: string | string[] | ZodIssue[];
  errorCode: ErrorCode;
  statusCode: number;
}

function errorJson({ message, statusCode, errorCode }: ErrorJson) {
  return NextResponse.json(
    {
      message,
      errorCode
    },
    { status: statusCode }
  );
}

export function userExistsError() {
  return errorJson({
    message: "User with same e-mail already exists.",
    errorCode: ErrorCode.USER_ALREADY_EXISTS,
    statusCode: 409
  });
}

export function userDoesNotExistError() {
  return errorJson({
    message: "User doesn't exist",
    errorCode: ErrorCode.USER_DOES_NOT_EXIST,
    statusCode: 404
  });
}

export function badRequestError(message: string, errorCode: ErrorCode) {
  return errorJson({
    message,
    errorCode,
    statusCode: 400
  });
}

export function incorrectPasswordError() {
  return badRequestError(
    "Incorrect password",
    ErrorCode.USER_INCORRECT_PASSWORD
  );
}

export function validationError(issues: ZodIssue[]) {
  return errorJson({
    message: issues,
    errorCode: ErrorCode.VALIDATION_ERROR,
    statusCode: 500
  });
}

export function invalidToken() {
  return errorJson({
    message: "Invalid token",
    errorCode: ErrorCode.INVALID_TOKEN,
    statusCode: 403
  });
}
