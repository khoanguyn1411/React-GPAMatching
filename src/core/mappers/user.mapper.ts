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
      experience: data.bio ?? "",
      phoneNumber: data.phoneNumber,
      email: "",
      gender: genderMapper.fromDto(data.gender),
      isFilledInformation: data.isFilledInformation,
      socialLink: data.socialLink,
      yearOfStudent: userStudyYearMapper.fromDto(data.yearOfStudent),
      school: data.school,
      homeAddress: data.homeAddress,
      hasCreatedProject: data.hasCreatePost,
      knownVia: KnownVia.fromReadable(data.wayToKnow),
      isReadyToJoin: data.wayToKnow === IsReadyToJoin.toReadable(true) ? true : false,
      readyToJoin: IsReadyToJoin.ThreeChoices.fromReadable(data.willingToJoinCompetition),
      skillSet: data.skillsSet.map((skill) => skillMapper.fromDto(skill)),
      teamIds: data.teamIds,
    };
  }
  public toCreationDto(data: User): UserCreationDto {
    return {
      fullName: data.fullName,
      avatar: data.avatarUrl,
      dob: dateMapper.toDto(data.dob),
      bio: data.experience,
      phoneNumber: data.phoneNumber,
      gender: genderMapper.toDto(data.gender),
      isFilledInformation: data.isFilledInformation,
      socialLink: data.socialLink,
      yearOfStudent: userStudyYearMapper.toDto(data.yearOfStudent),
      school: data.school,
      homeAddress: data.homeAddress,
      wayToKnow: KnownVia.toReadable(data.knownVia),
      willingToAttendOffline: IsReadyToJoin.toReadable(data.isReadyToJoin),
      willingToJoinCompetition: IsReadyToJoin.ThreeChoices.toReadable(data.readyToJoin),
      skillsSet: data.skillSet.map((skill) => skillMapper.toDto(skill)),
    };
  }
}

export const userMapper = new UserMapper();
