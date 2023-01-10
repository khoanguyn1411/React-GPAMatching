import { RecordObject } from "@/utils/types/common";

import { HttpError } from "./http-error";

export interface ErrorResponse<
  Error extends RecordObject,
  KeyOfError extends keyof Error | null = null,
> {
  readonly statusCode: number;
  readonly unknownError: unknown;
  readonly httpError: HttpError<Error, KeyOfError> | null;
}
