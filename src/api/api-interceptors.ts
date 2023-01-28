import { AxiosRequestConfig } from "axios";

export async function interceptToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const token = null;
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
      Authorization: `Bearer ${token}`,
    },
  };
}
