import { RecordObject } from "@/utils/types/common";

import { AppResponseDto } from "../dtos/app-response.dto";
import { ErrorResponse } from "../models/error-response";
import { IMapperToHttpError } from "./base-mappers/mapper";

interface ErrorFromDtoParams<Result, Error extends RecordObject, ErrorDto> {
  errorDto: AppResponseDto<Result, ErrorDto>;
  httpErrorFromDtoMapper: IMapperToHttpError<ErrorDto, Error>["httpErrorFromDto"];
}

export class ErrorMapper {
  public fromDto<Result, Error extends RecordObject, ErrorDto>({
    errorDto,
    httpErrorFromDtoMapper,
  }: ErrorFromDtoParams<Result, Error, ErrorDto>): ErrorResponse<Error> {
    return {
      statusCode: errorDto.status_code,
      unknownError: errorDto.unknown_error_dto,
      httpError: errorDto.http_error_dto ? httpErrorFromDtoMapper(errorDto.http_error_dto) : null,
    };
  }
}

export const errorMapper = new ErrorMapper();
