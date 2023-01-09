import { AxiosError } from "axios";

import { AppResponseDto } from "@/core/dtos/app-response.dto";
import { DetailErrorDto, HttpErrorDto } from "@/core/dtos/http-error.dto";
import { RecordObject } from "@/utils/types/common";

const UNKNOWN_STATUS_CODE = 9999;

class ApiError {
  private validateHttpError<T>(
    _error: RecordObject,
    statusCode: string | undefined,
  ): _error is HttpErrorDto<T> {
    return statusCode === "401";
  }

  private isErrorWithDetail<T>(
    error: RecordObject,
  ): error is { error: string; details: DetailErrorDto<T> } {
    const isNotExceedKey = Object.keys(error).length < 3;
    const hasDetails = error.details != null;
    const hasError = error.error != null;
    return isNotExceedKey && hasDetails && hasError;
  }

  private isErrorWithError(error: RecordObject): error is { error: string } {
    const isNotExceedKey = Object.keys(error).length === 1;
    const hasError = error.error != null;
    return hasError && isNotExceedKey;
  }

  private isErrorWithArrayDetails(error: RecordObject): error is { details: string[] } {
    const isNotExceedKey = Object.keys(error).length === 1;
    const hasDetails = error.details != null;
    const isArray = Array.isArray(error.details);
    return hasDetails && isArray && isNotExceedKey;
  }

  public composeErrors<TResultDto, TErrorDto>(
    error: unknown,
  ): AppResponseDto<TResultDto, TErrorDto> {
    if (!(error instanceof AxiosError)) {
      return {
        status_code: UNKNOWN_STATUS_CODE,
        result_dto: null,
        unknown_error_dto: error,
        http_error_dto: null,
      };
    }
    const isHttpError = this.validateHttpError(error.response?.data, error.code);
    if (isHttpError) {
      const rootHttpError = error.response?.data;
      let httpError: AppResponseDto<TResultDto, TErrorDto>["http_error_dto"];
      if (Array.isArray(rootHttpError)) {
        httpError = {
          non_field_errors: rootHttpError,
        } as HttpErrorDto<TErrorDto>;
      } else if (this.isErrorWithDetail<TErrorDto>(rootHttpError)) {
        httpError = rootHttpError.details;
      } else if (this.isErrorWithError(rootHttpError)) {
        httpError = {
          non_field_errors: [rootHttpError.error],
        } as HttpErrorDto<TErrorDto>;
      } else if (this.isErrorWithArrayDetails(rootHttpError)) {
        httpError = {
          non_field_errors: rootHttpError.details,
        } as HttpErrorDto<TErrorDto>;
      } else {
        httpError = rootHttpError as HttpErrorDto<TErrorDto>;
      }
      return {
        status_code: error.status ?? UNKNOWN_STATUS_CODE,
        result_dto: null,
        unknown_error_dto: null,
        http_error_dto: httpError,
      };
    }
    return {
      status_code: UNKNOWN_STATUS_CODE,
      result_dto: null,
      unknown_error_dto: error.config?.data ?? error.message,
      http_error_dto: null,
    };
  }
}

export const apiError = new ApiError();
