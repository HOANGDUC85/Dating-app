import { instance } from "./api-instance-provider";

// Hàm để gọi API tải tất cả hồ sơ người dùng
export async function loadAllProfiles() {
  try {
    const response = await instance.get(`/profiles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,  // Gửi token trong header
      }
    });
     // Đảm bảo ánh xạ đúng trường hình ảnh
     return response.data.data.map(profile => ({
      ...profile,
      imageUrl: profile.avatar || profile.imageUrl // Sử dụng avatar hoặc imageUrl tuỳ thuộc vào API
    }));
  } catch (error) {
    console.error('Error loading all profiles:', error);
    throw error;
  }
}
