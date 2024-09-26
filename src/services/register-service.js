import { instance, Register } from "./api-instance-provider";

export const registerUser = async (email, password) => {
  try {
    const response = await instance.post(Register.ORIGIN, {
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
