// services/viewProfile-service.js
import { instance } from "./api-instance-provider"; // Import instance API

export const getProfileById = async (email) => {
  try {
    const response = await instance.post("/getUserId", { email });
    if (response.data && response.data.userId) {
      console.log(
        "🚀 ~ getUserIdByEmail ~ response.data.userId:",
        response.data.userId
      );
      return response.data.userId; // Trả về userId
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching userId:", error);
    throw error;
  }
};
