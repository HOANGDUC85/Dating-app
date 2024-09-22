import axios from "axios";
export const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/users'
  });
  export const Register = {
    ORIGIN: '/register',
  }
  export const Login = {
    ORIGIN: '/login',
  }
  
