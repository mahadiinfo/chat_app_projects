import axios from "axios";

const DB_URL = import.meta.env.BASE_URL;
export const axiosIns = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
