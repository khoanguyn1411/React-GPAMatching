import { ProvinceDto } from "../dtos/province.dto";
import { Province } from "../models/province";
import { IMapperFromDto } from "./base-mappers/mapper";

class ProvinceMapper implements IMapperFromDto<ProvinceDto, Province> {
  public fromDto(data: ProvinceDto): Province {
    return {
      name: data.name,
      code: data.code,
      codename: data.codename,
      phoneCode: data.phone_code,
      divisionType: data.division_type,
    };
  }
}

export const provinceMapper = new ProvinceMapper();
