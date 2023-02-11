import axios from "axios";

import { ProvinceDto } from "@/core/dtos/province.dto";
import { provinceMapper } from "@/core/mappers/province.mapper";
import { Province } from "@/core/models/province";

export namespace ProvinceService {
  const url = "https://provinces.open-api.vn/api/";
  export async function getProvince(): Promise<readonly Province[]> {
    const result = await axios.get<readonly ProvinceDto[]>(url);
    return result.data.map((provinceDto) => provinceMapper.fromDto(provinceDto));
  }
}
