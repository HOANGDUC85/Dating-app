import { instance } from './api-instance-provider';

// Hàm lấy danh sách tất cả các quán cafe
export const getAllCafes = async () => {
  try {
    const response = await instance.get('/cafes');
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching cafes' };
  }
};
