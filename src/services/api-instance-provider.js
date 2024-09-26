import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.VITE_PUBLIC_BASE_URL || "http://localhost:8080/api/v1/users",
});

export const Login = {
  ORIGIN: "/login", // Đường dẫn API login
};