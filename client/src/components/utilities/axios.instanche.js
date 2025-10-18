import axios from "axios";

const DB_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const axiosIns = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
