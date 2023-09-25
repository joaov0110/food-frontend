import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3005/api",
  timeout: 60000,
  withCredentials: true,
});

export default httpClient;
