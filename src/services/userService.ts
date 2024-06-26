import { AxiosRequestConfig } from "axios";

import { http } from "@/api/api-core";
import { UserSecretDto } from "@/core/dtos/user-secret.dto";
import { userSecretMapper } from "@/core/mappers/user-secret.mapper";
import { UserRefreshSecret, UserSecret, UserSecretCreation } from "@/core/models/user-secret";
import { firebaseAuth } from "@/firebase/firebase-config";
import { ComposeUrlService } from "@/utils/funcs/compose-url";
import { LocalStorage } from "@/utils/funcs/local-storage";

export namespace UserService {
  const authUrlService = new ComposeUrlService("auth");
  const SECRET_KEY = "secret";

  export async function saveSecret(secret: UserSecret): Promise<void> {
    return await LocalStorage.setValue<UserSecret>(SECRET_KEY, secret);
  }

  export async function getSecret(): Promise<UserSecret | null> {
    return await LocalStorage.getValue<UserSecret>(SECRET_KEY);
  }

  export async function clearSecret(): Promise<void> {
    return LocalStorage.remove(SECRET_KEY);
  }

  export async function signOut(): Promise<void> {
    await UserService.clearSecret();
    await firebaseAuth.signOut();
  }

  export function shouldInterceptToken(request: AxiosRequestConfig): boolean {
    if (request.url && request.url.includes("login") && request.method === "post") {
      return false;
    }
    return true;
  }

  export async function logOut() {
    const url = authUrlService.concatWith(["logout"]);
    return await http.get(url, { timeout: 3000 });
  }

  export async function refreshSecret(token: UserRefreshSecret): Promise<UserSecret | Error> {
    const loginUrl = authUrlService.concatWith(["refresh"]);
    try {
      const result = await http.post<UserSecretDto>(loginUrl, userSecretMapper.toRefreshDto(token));
      return userSecretMapper.fromDto(result.data);
    } catch (error) {
      return new Error("Login Failed");
    }
  }

  export async function getUserSecret(token: UserSecretCreation): Promise<UserSecret | Error> {
    const loginUrl = authUrlService.concatWith(["login"]);
    try {
      const result = await http.post<UserSecretDto>(
        loginUrl,
        userSecretMapper.toCreationDto(token),
      );
      return userSecretMapper.fromDto(result.data);
    } catch (error) {
      return new Error("Login Failed");
    }
  }
}
