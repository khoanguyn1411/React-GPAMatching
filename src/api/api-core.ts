import axios from "axios";

import { CONFIG } from "./api-config";
import { interceptToken, refreshToken } from "./api-interceptors";
const TIMEOUT = 8000;

export const http = axios.create({
  baseURL: `${CONFIG.apiUrl}/api/`,
  timeout: TIMEOUT,
});

http.interceptors.request.use(interceptToken);
http.interceptors.response.use((response) => {
  return response;
}, refreshToken());
