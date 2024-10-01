import { instance, Login } from "./api-instance-provider"; // Import cả instance và Login
import { getLoggedInUser } from "./auth-service";
export const loginUser = async (email, password) => {
  try {
    const response = await instance.post(Login.ORIGIN, {
      // Sử dụng Login.ORIGIN
      email,
      password,
    });
    if (response.data && response.data.data) {
      // Lưu token và email vào localStorage
      localStorage.setItem("userToken", response.data.data);
      localStorage.setItem("userEmail", email);
      const userToken = localStorage.getItem("userToken");
      // Gọi API để lấy userId từ email
      const userId = await getLoggedInUser(email);
      console.log(userId);
      if (userId) {
        localStorage.setItem("userId", userId); // Lưu userId vào localStorage
      }
    }

    return response.data; // Trả về data nhận được từ server
  } catch (error) {
    console.log(error);
    throw new Error(error || "Đăng nhập thất bại");
  }
};
