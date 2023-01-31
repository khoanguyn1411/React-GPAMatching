import { AxiosError, AxiosResponse } from "axios";

import { AppResponseDto } from "@/core/dtos/app-response.dto";

import { apiError } from "./api-errors";

export async function composeHttpMethodResult<TResultDto, TErrorDto>(
  method: Promise<AxiosResponse<TResultDto>>,
): Promise<AppResponseDto<TResultDto, TErrorDto>> {
  const response = await method;
  if (response instanceof AxiosError) {
    return apiError.composeErrors<TResultDto, TErrorDto>(response);
  }
  return {
    status_code: response.status,
    result_dto: response.data,
    unknown_error_dto: null,
    http_error_dto: null,
  };
}
