import { UserProfileDto } from "../dtos/user.dto";
import { UserProfile } from "../models/user";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";

class UserProfileMapper implements IMapperFromDto<UserProfileDto, UserProfile> {
  public fromDto(data: UserProfileDto): UserProfile {
    return {
      id: data._id,
      avatarUrl: data.avatar,
      createdAt: dateMapper.fromDto(data.createdAt),
      fullName: data.fullName,
      isAdmin: data.isAdmin,
      isFilledInformation: data.isFilledInformation,
      isOrganizer: data.isOrganizer,
      isParticipant: data.isParticipant,
      lastLogin: data.lastLogin ? dateMapper.fromDto(data.lastLogin) : null,
      updatedAt: data.updatedAt ? dateMapper.fromDto(data.updatedAt) : null,
    };
  }
}

export const userProfileMapper = new UserProfileMapper();
