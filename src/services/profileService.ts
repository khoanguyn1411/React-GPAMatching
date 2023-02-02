import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { UserDto } from "@/core/dtos/user.dto";
import { userMapper } from "@/core/mappers/user.mapper";
import { User, UserProfileCreation } from "@/core/models/user";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace ProfileService {
  const profileUrlService = new ComposeUrlService("profile");

  export async function getPersonal(): Promise<User> {
    const personalUrl = profileUrlService.concatWith(["personal"]);
    const result = await http.get<UserDto>(personalUrl);
    return userMapper.fromDto(result.data);
  }

  export async function getPersonalWithController(
    controller: AbortController,
  ): Promise<User | Error> {
    const personalUrl = profileUrlService.concatWith(["personal"]);
    const method = http.get<UserDto>(personalUrl, { signal: controller.signal });
    try {
      const result = await composeHttpMethodResult(method);
      if (result.result_dto == null) {
        return new Error("Unexpected null result");
      }
      return userMapper.fromDto(result.result_dto);
    } catch (error) {
      return new Error("Login Failed");
    }
  }

  export async function updateProfile({
    data,
    currentUser,
  }: {
    data: UserProfileCreation;
    currentUser: User;
  }) {
    const url = profileUrlService.constructUrlWithParam(data.id);
    const dataDto = userMapper.toCreationDto({ ...currentUser, ...data });
    const result = await http.put<UserDto>(url, dataDto);
    return userMapper.fromDto(result.data);
  }

  export async function getProfileById(id: User["id"]) {
    const url = profileUrlService.constructUrlWithParam(id);
    const result = await http.get<UserDto>(url);
    return userMapper.fromDto(result.data);
  }
}
