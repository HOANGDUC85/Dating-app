import { instance } from './api-instance-provider';

// Hàm lấy danh sách matches cho userId
export const getMatchesForUser = async (userId) => {
  try {
    const response = await instance.get(`matches/user/${userId}`);
    return response.data.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching matches' };
  }
};

// Hàm lấy danh sách tin nhắn theo matchId
export const getMessagesForMatch = async (matchId) => {
  try {
    const response = await instance.get(`/messages/match/${matchId}`);
    return response.data.data; // Trả về danh sách tin nhắn
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Unable to fetch messages");
  }
};

// Hàm gửi tin nhắn đến server
export const sendMessageToMatch = async (matchId, senderId, receiverId, content) => {
    try {
      const response = await instance.post('/messages/send', {
        matchId,
        senderId,
        receiverId,
        content,
      });
      return response.data.data; // Trả về tin nhắn đã gửi
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Unable to send message");
    }
  };

