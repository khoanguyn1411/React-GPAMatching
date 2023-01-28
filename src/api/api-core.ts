import axios from "axios";

import { CONFIG } from "./api-config";
import { interceptToken, refreshToken } from "./api-interceptors";

export const http = axios.create({
  baseURL: `${CONFIG.apiUrl}/api/`,
});

http.interceptors.request.use(interceptToken);
http.interceptors.response.use((response) => {
  return response;
}, refreshToken());
