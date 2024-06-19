import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASE_URL

export const serviceInstance = axios.create({
  baseURL:BaseUrl
});
