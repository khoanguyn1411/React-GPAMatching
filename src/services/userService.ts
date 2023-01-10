import { AxiosRequestConfig } from "axios";

import { LocalStorage } from "@/utils/funcs/local-storage";

interface Token {
  access: string;
  refresh: string;
}

const TOKEN_KEY = "Test";

export namespace UserService {
  /**
   * Check if token is required for request or not.
   * @param request Request need to be checked.
   */
  export function shouldInterceptToken(request: AxiosRequestConfig): boolean {
    if (request.url?.includes("login") && request.method === "post") {
      return false;
    }
    return true;
  }

  /**
   * Get token from local storage.
   * @returns Return null if there is no token in local storage.
   */
  export function getToken(): Token | null {
    return LocalStorage.getValue<Token>(TOKEN_KEY);
  }

  /**
   * Save token to local storage.
   * @param token Token need to be saved.
   */
  export function setToken(token: Token): void {
    LocalStorage.setValue<Token>(TOKEN_KEY, token);
  }

  /** Remove token out of local storage. */
  export function clearToken(): void {
    LocalStorage.remove(TOKEN_KEY);
  }

  /**
   * Check if token is valid (Check if token != null).
   * @returns Return false when token is null, otherwise true.
   */
  export function isValid(): boolean {
    const token = getToken();
    if (token == null) {
      return false;
    }
    return true;
  }
}
