import { instance } from "./api-instance-provider"; // Đảm bảo import Axios instance chính xác

export async function fetchImage(url) {
  const token = localStorage.getItem("userToken");

  if (token) {
    try {
      console.log("Token:", token); // Log để kiểm tra token

      const response = await instance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Đảm bảo header Authorization được gửi đúng
        },
        responseType: 'blob'
      });

      console.log("Blob data:", response.data); // Kiểm tra blob data
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  } else {
    console.error("User token not found.");
    return url; // Trả về URL gốc nếu không có token
  }
}
