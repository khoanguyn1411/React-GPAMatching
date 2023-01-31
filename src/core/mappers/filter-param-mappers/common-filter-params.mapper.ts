import { CommonFilterParamsDto } from "@/core/dtos/filter-param-dtos/common-filter-params.dto";
import { CommonFilterParams } from "@/core/models/filter-params/common-filter-params";

import { IMapperToDto } from "../base-mappers/mapper";

export class CommonFilterParamsMapper
  implements IMapperToDto<CommonFilterParamsDto.Combined, CommonFilterParams.Combined>
{
  /** @inheritdoc */
  public toDto(data: CommonFilterParams.Combined): CommonFilterParamsDto.Combined {
    return {
      ...this.toSearchFilterDto(data),
      ...this.toPaginationFilterDto(data),
    };
  }

  /** @inheritdoc */
  public toSearchFilterDto(data: CommonFilterParams.Search): CommonFilterParamsDto.SearchDto {
    return {
      search: data.search ?? undefined,
    };
  }

  /** @inheritdoc */
  public toPaginationFilterDto(
    data: CommonFilterParams.Pagination,
  ): CommonFilterParamsDto.PaginationDto {
    return {
      limit: data.limit,
      page: data.page,
    };
  }
}

export const commonFilterParamsMapper = new CommonFilterParamsMapper();
