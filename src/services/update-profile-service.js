import { instance } from './api-instance-provider'; // Sử dụng axios instance đã thiết lập

export const updateProfile = async (email, name, age, bio, gender) => {
  try {
    const response = await instance.post('/users/update-profile', {
      email,
      name,
      age,
      bio,
      gender,
    });
    return response.data; // Trả về data từ server
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};
