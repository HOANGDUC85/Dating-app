import { instance } from "./api-instance-provider"; // Sử dụng axios instance để gọi API
import { Login } from "./api-instance-provider"; // Đường dẫn tới API login

export const loginUser = async (email, password) => {
   

  try {
    const response = await instance.post(Login.ORIGIN, {
      email,
      password,
    });
    return response.data; // Trả về data nhận được từ server
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};
