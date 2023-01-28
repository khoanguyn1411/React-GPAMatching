import {
  UserRefreshSecretDto,
  UserSecretCreationDto,
  UserSecretDto,
} from "../dtos/user-secret.dto";
import { UserRefreshSecret, UserSecret, UserSecretCreation } from "../models/user-secret";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";

class UserSecretMapper
  implements
    IMapperFromDto<UserSecretDto, UserSecret>,
    IMapperToCreationDto<UserSecretCreationDto, UserSecretCreation>
{
  public fromDto(data: UserSecretDto): UserSecret {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
  public toCreationDto(data: UserSecretCreation): UserSecretCreationDto {
    return {
      id_token: data.idToken,
    };
  }

  public toRefreshDto(data: UserRefreshSecret): UserRefreshSecretDto {
    return {
      refreshToken: data.refreshToken,
    };
  }
}

export const userSecretMapper = new UserSecretMapper();
