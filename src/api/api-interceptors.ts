import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { UserService } from "@/services/userService";

export function interceptToken(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!UserService.shouldInterceptToken(config)) {
    return config;
  }
  const token = UserService.getToken();
  if (token == null) {
    return config;
  }
  const { headers } = config;
  return {
    ...config,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: https://github.com/axios/axios/issues/5034
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}
export function refreshToken() {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    // const config = error.config;
    // if (!config) {
    //   return Promise.reject(error);
    // }
    // const token = UserService.getToken();
    // if (token == null) {
    //   return Promise.reject(error);
    // }
    // if (error.response == null) {
    //   return Promise.reject(error);
    // }
    // if (config.url?.includes("refresh")) {
    //   UserService.clearToken();
    //   return Promise.reject(error);
    // }
    // if (error.response.status === 401) {
    //   const result = await AuthApi.refreshToken(token);
    //   if (result.kind !== "ok") {
    //     UserService.clearToken();
    //     return Promise.reject(error);
    //   }
    //   const newTokenModel = tokenMapper.fromRefreshTokenDto(result.result_dto);
    //   UserService.setToken(newTokenModel);
    //   config.headers["Authorization"] = `Bearer ${newTokenModel.access}`;
    //   return http.request(config);
    // }
    return Promise.reject(error);
  };
}
