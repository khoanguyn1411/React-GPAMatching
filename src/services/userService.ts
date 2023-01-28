import { AxiosRequestConfig } from "axios";
import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from "firebase/auth";

import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { UserSecretDto } from "@/core/dtos/user-secret.dto";
import { userSecretMapper } from "@/core/mappers/user-secret.mapper";
import { UserRefreshSecret, UserSecret, UserSecretCreation } from "@/core/models/user-secret";
import { firebaseAuth } from "@/firebase/firebase-config";
import { ComposeUrlService } from "@/utils/funcs/compose-url";
import { LocalStorage } from "@/utils/funcs/local-storage";

export namespace UserService {
  const authUrlService = new ComposeUrlService("auth");

  const SECRET_KEY = "secret";
  const provider = new GoogleAuthProvider();

  export function signInWithGoogle(
    onSuccess?: (result: OAuthCredential | null) => void,
    onError?: (error: unknown) => void,
  ): void {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const googleCredential = GoogleAuthProvider.credentialFromResult(result);
        onSuccess?.(googleCredential);
      })
      .catch((error) => onError?.(error));
  }

  export function saveSecret(secret: UserSecret): void {
    LocalStorage.setValue<UserSecret>(SECRET_KEY, secret);
  }

  export function getSecret(): UserSecret | null {
    return LocalStorage.getValue<UserSecret>(SECRET_KEY);
  }

  export function clearSecret(): void {
    return LocalStorage.remove(SECRET_KEY);
  }

  export function signOut(): void {
    firebaseAuth.signOut();
    UserService.clearSecret();
  }

  /**
   * Check if token is required for request or not.
   * @param request Request need to be checked.
   */
  export function shouldInterceptToken(request: AxiosRequestConfig): boolean {
    if (request.url && request.url.includes("auth") && request.method === "post") {
      return false;
    }
    return true;
  }

  export async function refreshSecret(token: UserRefreshSecret): Promise<UserSecret | Error> {
    const loginUrl = authUrlService.concatWith(["refresh"]);
    const method = http.post<UserSecretDto>(loginUrl, userSecretMapper.toRefreshDto(token));
    try {
      const result = await composeHttpMethodResult(method);
      if (result.result_dto == null) {
        return new Error("Unexpected null result");
      }
      return userSecretMapper.fromDto(result.result_dto);
    } catch (error) {
      return new Error("Login Failed");
    }
  }

  export async function getUserSecret(token: UserSecretCreation): Promise<UserSecret | Error> {
    const loginUrl = authUrlService.concatWith(["login"]);
    const method = http.post<UserSecretDto>(loginUrl, userSecretMapper.toCreationDto(token));
    try {
      const result = await composeHttpMethodResult(method);
      if (result.result_dto == null) {
        return new Error("Unexpected null result");
      }
      return userSecretMapper.fromDto(result.result_dto);
    } catch (error) {
      return new Error("Login Failed");
    }
  }
}
