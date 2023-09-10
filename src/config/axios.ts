import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 30000,
  withCredentials: true,
});

export default httpClient;
