import { RecordObject } from "@/utils/types/common";

import { PaginationDto } from "../dtos/pagination.dto";
import { Pagination } from "../models/pagination";
import { IMapperFromDto } from "./base-mappers/mapper";

export class PaginationMapper {
  public fromDto<T extends RecordObject, E extends RecordObject>(
    paginationDataDto: PaginationDto<T>,
    mapperSupport: IMapperFromDto<T, E>,
  ) {
    return new Pagination({
      nextPageUrl: paginationDataDto.next,
      result: paginationDataDto.posts.map((entity) => mapperSupport.fromDto(entity)),
    });
  }
}

export const paginationMapper = new PaginationMapper();
