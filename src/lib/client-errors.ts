import { ErrorJson } from "./server-errors";

export type ErrorResponse = Omit<ErrorJson, "statusCode">;

export const isErrorResponse = (val: any): val is ErrorResponse => {
  return "message" in val || "errorCode" in val;
};
