import { CONFIG } from "@/api/api-config";
import { http } from "@/api/api-core";
import { UploadAvatarDto } from "@/core/dtos/upload-avatar.dto";
import { uploadAvatarMapper } from "@/core/mappers/upload-avatar.mapper";
import { UploadAvatarCreation } from "@/core/models/upload-avatar";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace UploadService {
  const uploadUrlService = new ComposeUrlService("drive");
  const apiUrlService = new ComposeUrlService(CONFIG.apiUrl);

  export async function uploadAvatar(avatar: UploadAvatarCreation) {
    const url = uploadUrlService.concatWith(["upload"]);
    const avatarDto = uploadAvatarMapper.toCreationDto(avatar);
    const result = await http.post<UploadAvatarDto>(url, avatarDto);
    const avatarUrl = uploadAvatarMapper.fromDto(result.data).avatar;
    return apiUrlService.concatWith([avatarUrl]);
  }
}
