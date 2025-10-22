import axios from "axios";

const DB_URL = "https://chatappprojects-production.up.railway.app/api/v1;
export const axiosIns = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
