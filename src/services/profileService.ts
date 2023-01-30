import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { UserDto, UserProfileDto } from "@/core/dtos/user.dto";
import { userMapper } from "@/core/mappers/user.mapper";
import { userProfileMapper } from "@/core/mappers/user-profile.mapper";
import { UserInformation, UserProfile } from "@/core/models/user";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace ProfileService {
  const profileUrlService = new ComposeUrlService("profile");
  export async function getPersonal(controller: AbortController): Promise<UserProfile | Error> {
    const personalUrl = profileUrlService.concatWith(["personal"]);
    const method = http.get<UserProfileDto>(personalUrl, { signal: controller.signal });
    try {
      const result = await composeHttpMethodResult(method);
      if (result.result_dto == null) {
        return new Error("Unexpected null result");
      }
      return userProfileMapper.fromDto(result.result_dto);
    } catch (error) {
      return new Error("Login Failed");
    }
  }

  export async function updateProfile({
    id,
    data,
  }: {
    id: UserProfile["id"];
    data: UserInformation;
  }) {
    const url = profileUrlService.constructUrlWithParam(id);
    const dataDto = userMapper.toCreationDto(data);
    return http.put(url, dataDto);
  }

  export async function getProfileById(id: UserProfile["id"]) {
    const url = profileUrlService.constructUrlWithParam(id);
    const result = await http.get<UserDto>(url);
    return userMapper.fromDto(result.data);
  }
}
