import axios, { AxiosInstance } from "axios";
import { ENVIRONMENT } from "./enviroment";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENVIRONMENT.BASE_URL
});