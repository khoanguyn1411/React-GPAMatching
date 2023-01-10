import { HttpErrorDto } from "@/core/dtos/http-error.dto";
import { HttpError } from "@/core/models/http-error";
import { RecordObject } from "@/utils/types/common";

/**
 * Mapper of DTO to domain model.
 */
export interface IMapperFromDto<TDto, TDomain> {
  /**
   * Maps from DTO to Domain model.
   */
  fromDto(data: TDto): TDomain;
}

/**
 * Mapper of domain model to DTO.
 */
export interface IMapperToDto<TDto, TDomain> {
  /**
   * Maps from Domain to DTO model.
   */
  toDto(data: TDomain): TDto;
}

/**
 * Mapper of domain model to DTO.
 */
export interface IMapperToCreationDto<TDto, TDomain> {
  /**
   * Maps from Domain to DTO model.
   */
  toCreationDto(data: TDomain): TDto;
}

/**
 * Mapper of errors of DTO to domain model errors.
 */
export interface IMapperToHttpError<TDto, TDomain extends RecordObject> {
  /**
   * Map validation error DTO to error for domain model.
   * @param errorDto Error DTO.
   */
  httpErrorFromDto(errorDto: HttpErrorDto<TDto>): HttpError<TDomain, null | keyof TDomain>;
}

/**
 * Mapper from DTO to Domain model and vice versa.
 */
export interface IMapper<TDto, TDomain>
  extends IMapperFromDto<TDto, TDomain>,
    IMapperToDto<TDto, TDomain> {}
