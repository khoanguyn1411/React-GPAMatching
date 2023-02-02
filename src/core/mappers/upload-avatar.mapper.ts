import { repairFormData } from "@/utils/funcs/repair-form-data";

import { UploadAvatarCreationDto, UploadAvatarDto } from "../dtos/upload-avatar.dto";
import { UploadAvatar, UploadAvatarCreation } from "../models/upload-avatar";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";

class UploadAvatarMapper
  implements
    IMapperToCreationDto<FormData, UploadAvatarCreation>,
    IMapperFromDto<UploadAvatarDto, UploadAvatar>
{
  public toCreationDto(data: UploadAvatarCreation): FormData {
    const formData = repairFormData<UploadAvatarCreationDto>({ avatar: data.avatar });
    return formData;
  }

  public fromDto(data: UploadAvatarDto): UploadAvatar {
    return {
      avatar: data.avatar,
    };
  }
}

export const uploadAvatarMapper = new UploadAvatarMapper();
