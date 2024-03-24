import { ErrorJson } from "./server-errors";

export type ErrorResponse = Omit<ErrorJson, "statusCode"> | undefined;
