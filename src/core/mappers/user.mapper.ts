import { UserCreationDto } from "../dtos/user.dto";
import { IsReadyToJoin } from "../models/is-ready-to-join";
import { KnownVia } from "../models/known-via";
import { UserInformation } from "../models/user";
import { dateMapper } from "./base-mappers/date.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
import { IMapperToCreationDto } from "./base-mappers/mapper";
import { skillMapper } from "./skill.mapper";
import { userStudyYearMapper } from "./user-study-year.mapper";

class UserMapper implements IMapperToCreationDto<UserCreationDto, UserInformation> {
  public toCreationDto(data: UserInformation): UserCreationDto {
    return {
      fullName: data.fullName,
      avatar: data.avatarUrl,
      dob: dateMapper.toDto(data.dob),
      bio: data.userWithNoIdea?.experience ?? "Không",
      phoneNumber: data.phoneNumber,
      gender: genderMapper.toDto(data.gender),
      socialLink: data.socialLink,
      email: undefined,
      yearOfStudent: userStudyYearMapper.toDto(data.yearOfStudent),
      school: data.school,
      homeAddress: data.homeAddress,
      wayToKnow: KnownVia.toReadable(data.knownVia),
      willingToAttendOffline: IsReadyToJoin.toReadable(data.isReadyToJoin),
      willingToJoinCompetition: data.userWithNoIdea
        ? IsReadyToJoin.ThreeChoices.toReadable(data.userWithNoIdea.readyToJoin)
        : "Không",
      skillsSet: data.skillSet.map((skill) => skillMapper.toDto(skill)),
    };
  }
}

export const userMapper = new UserMapper();
