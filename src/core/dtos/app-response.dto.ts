import { HttpErrorDto } from "./http-error.dto";

export type AppResponseDto<TResultDto, TErrorDto = TResultDto> = {
  readonly status_code: number;
  readonly result_dto: TResultDto | null;
  readonly unknown_error_dto: unknown;
  readonly http_error_dto: HttpErrorDto<TErrorDto> | null;
};
