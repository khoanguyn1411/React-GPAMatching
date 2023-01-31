import { UserShortDto } from "../dtos/user.dto";
import { UserShort } from "../models/user";
import { dateMapper } from "./base-mappers/date.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";
import { skillMapper } from "./skill.mapper";
import { userStudyYearMapper } from "./user-study-year.mapper";

class UserShortMapper implements IMapperFromDto<UserShortDto, UserShort> {
  public fromDto(data: UserShortDto): UserShort {
    return {
      id: data._id,
      fullName: data.fullName,
      avatarUrl: data.avatar,
      dob: dateMapper.fromDto(data.dob),
      gender: genderMapper.fromDto(data.gender),
      school: data.school,
      skillSet: data.skillsSet.map((skill) => skillMapper.fromDto(skill)),
      yearOfStudent: userStudyYearMapper.fromDto(data.yearOfStudent),
    };
  }
}

export const userShortMapper = new UserShortMapper();
