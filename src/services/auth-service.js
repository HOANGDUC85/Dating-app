import { jwtDecode } from "jwt-decode"; // Dùng thư viện jwt-decode để giải mã token
import { instance, Login } from "./api-instance-provider"; // Import cả instance và Login

export const getLoggedInUser = async () => {
  // Lấy token từ localStorage
  const token = localStorage.getItem("userToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(
        "🚀 ~ getLoggedInUser ~ decodedToken.userId:",
        decodedToken.userId
      );
      return decodedToken;
      const response = await instance.post("/profile", {
        token,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  } else {
    console.error("No token found in localStorage.");
    return null;
  }
};
