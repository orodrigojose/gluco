import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { env } from "../config/env";

const config: AxiosRequestConfig = {
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

export const api: AxiosInstance = axios.create(config);
