import { UserCreationDto, UserDto } from "../dtos/user.dto";
import { IsReadyToJoin } from "../models/is-ready-to-join";
import { KnownVia } from "../models/known-via";
import { User } from "../models/user";
import { dateMapper } from "./base-mappers/date.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";
import { skillMapper } from "./skill.mapper";
import { userStudyYearMapper } from "./user-study-year.mapper";

class UserMapper
  implements IMapperToCreationDto<UserCreationDto, User>, IMapperFromDto<UserDto, User>
{
  public fromDto(data: UserDto): User {
    return {
      id: data._id,
      fullName: data.fullName,
      avatarUrl: data.avatar,
      dob: dateMapper.fromDto(data.dob),
      experience: data.bio,
      phoneNumber: data.phoneNumber,
      email: "",
      gender: genderMapper.fromDto(data.gender),
      isFilledInformation: data.isFilledInformation,
      socialLink: data.socialLink,
      yearOfStudent: userStudyYearMapper.fromDto(data.yearOfStudent),
      school: data.school,
      homeAddress: data.homeAddress,
      knownVia: data.wayToKnow as KnownVia,
      isReadyToJoin: data.wayToKnow === IsReadyToJoin.toReadable(true) ? true : false,
      readyToJoin: data.wayToKnow as IsReadyToJoin.ThreeChoices,
      skillSet: data.skillsSet.map((skill) => skillMapper.fromDto(skill)),
      teamIds: data.teamIds,
    };
  }
  public toCreationDto(data: User): UserCreationDto {
    return {
      fullName: data.fullName,
      avatar: data.avatarUrl,
      dob: dateMapper.toDto(data.dob),
      bio: data.experience ?? "Không",
      phoneNumber: data.phoneNumber,
      gender: genderMapper.toDto(data.gender),
      isFilledInformation: data.isFilledInformation,
      socialLink: data.socialLink,
      yearOfStudent: userStudyYearMapper.toDto(data.yearOfStudent),
      school: data.school,
      homeAddress: data.homeAddress,
      wayToKnow: data.knownVia != null ? KnownVia.toReadable(data.knownVia) : undefined,
      willingToAttendOffline:
        data.isReadyToJoin != null ? IsReadyToJoin.toReadable(data.isReadyToJoin) : undefined,
      willingToJoinCompetition: data.readyToJoin
        ? IsReadyToJoin.ThreeChoices.toReadable(data.readyToJoin)
        : "Không",
      skillsSet: data.skillSet.map((skill) => skillMapper.toDto(skill)),
    };
  }
}

export const userMapper = new UserMapper();
