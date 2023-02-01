import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { UserService } from "@/services/userService";

import { http } from "./api-core";

export async function interceptToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const token = await UserService.getSecret();
  if (!UserService.shouldInterceptToken(config) || token == null) {
    return config;
  }
  const { headers } = config;
  return {
    ...config,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: https://github.com/axios/axios/issues/5034
    headers: {
      ...headers,
      Authorization: `Bearer ${token.accessToken}`,
    },
  };
}

export function refreshToken() {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    const { config } = error;
    const token = await UserService.getSecret();
    if (config == null || token == null || error.response == null) {
      UserService.signOut();
      return Promise.reject(error);
    }

    if (config.url?.includes("refresh")) {
      UserService.signOut();
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      console.log(error.response.status);
      const result = await UserService.refreshSecret({ refreshToken: token.refreshToken });
      if (result instanceof Error) {
        UserService.signOut();
        return Promise.reject(error);
      }
      UserService.saveSecret(result);
      return http.request({
        ...config,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: https://github.com/axios/axios/issues/5034
        headers: {
          ...config.headers,
          Authorization: `Bearer ${result.accessToken}`,
        },
      });
    }
    return Promise.reject(error);
  };
}
