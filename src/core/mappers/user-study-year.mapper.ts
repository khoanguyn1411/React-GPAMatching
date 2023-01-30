import { reverseRecord } from "@/utils/funcs/reverse-record";

import { UserStudyYearDto } from "../dtos/user-study-year.dto";
import { UserStudyYear } from "../models/user-study-year";
import { IMapper } from "./base-mappers/mapper";

const TO_USER_STUDY_YEAR_DTO: Readonly<Record<UserStudyYear, UserStudyYearDto>> = {
  [UserStudyYear.Year1]: UserStudyYearDto.Year1,
  [UserStudyYear.Year2]: UserStudyYearDto.Year2,
  [UserStudyYear.Year3]: UserStudyYearDto.Year3,
  [UserStudyYear.Year4]: UserStudyYearDto.Year4,
};

const FROM_USER_STUDY_YEAR_DTO = reverseRecord(TO_USER_STUDY_YEAR_DTO);

class UserStudyYearMapper implements IMapper<UserStudyYearDto, UserStudyYear> {
  public fromDto(data: UserStudyYearDto): UserStudyYear {
    return FROM_USER_STUDY_YEAR_DTO[data];
  }
  public toDto(data: UserStudyYear): UserStudyYearDto {
    return Number(TO_USER_STUDY_YEAR_DTO[data]);
  }
}

export const userStudyYearMapper = new UserStudyYearMapper();
