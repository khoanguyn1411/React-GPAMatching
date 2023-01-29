import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { UserProfileDto } from "@/core/dtos/user.dto";
import { userProfileMapper } from "@/core/mappers/user-profile.mapper";
import { UserProfile } from "@/core/models/user";
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
}
