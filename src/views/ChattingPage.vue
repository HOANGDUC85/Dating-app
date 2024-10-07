<template>
  <div class="chat-app">
    <LoveBellSidebar />

    <!-- Sidebar -->
    <div class="sidebar-chat">
      <div class="profile">
        <h3 class="profile-name">{{ profileName }}</h3>
      </div>
      <ul class="contact-list">
        <li
          v-for="contact in contacts"
          :key="contact.targetUserId"
          class="contact-item"
          @click="selectContact(contact)"
        >
          <img
            :src="contact.targetUserAvatar"
            alt="Contact Image"
            class="contact-avatar"
          />
          <div class="contact-info">
            <span class="contact-name">{{ contact.targetUserName }}</span>
            <span class="contact-message">{{ contact.lastMessage }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat Window -->
    <div class="chat-window">
      <div v-if="selectedContact" class="chat-header">
        <img
          :src="selectedContact.profileImage"
          alt="Profile"
          class="chat-avatar"
        />
        <h3>{{ selectedContact.name }}</h3>
        <div class="chat-controls">
          <button class="chat-control-button" @click="callUser">
            <span class="material-icons">phone</span>
          </button>
          <button class="chat-control-button" @click="videoCallUser">
            <span class="material-icons">videocam</span>
          </button>
          <button class="chat-control-button" @click="viewInfo">
            <span class="material-icons">info</span>
          </button>
        </div>
      </div>
      <div v-if="selectedContact" class="chat-content">
        <div v-if="selectedContact" class="chat-content">
          <div
            class="message"
            v-for="(message, index) in selectedContact.messages"
            :key="index"
            :class="{
              'my-message': message.sender === 'me',
              'other-message': message.sender !== 'me',
            }"
          >
            <img
              v-if="message.sender !== 'me'"
              :src="selectedContact.profileImage"
              class="chat-avatar"
              alt="Profile"
            />
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>

      <div v-if="selectedContact" class="chat-input">
        <input v-model="newMessage" placeholder="Nhắn tin..." />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import {
  getMatchesForUser,
  getMessagesForMatch,
  sendMessageToMatch,
} from "@/services/match-service"; // Import API gửi tin nhắn

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      profileName: "Message",
      contacts: [], // Danh sách contacts sẽ được lấy từ API
      selectedContact: null,
      newMessage: "",
      userId: null, // Lấy ID của người dùng từ JWT
      token: localStorage.getItem("userToken"), // Giả sử bạn lưu JWT trong localStorage
      currentUserId: null,
    };
  },
  methods: {
    async getMatchesForUser() {
      try {
        // Gọi API để lấy danh sách contacts
        const contactsData = await getMatchesForUser();
        this.contacts = contactsData; // Cập nhật danh sách contacts
      } catch (error) {
        console.error("Error loading contacts:", error.message);
      }
    },
    async selectContact(contact) {
  try {
    this.selectedContact = contact;

    const token = this.token;
    if (!token || typeof token !== "string" || token === "1") {
      console.error("Token không hợp lệ:", token);
      alert("Vui lòng đăng nhập lại.");
      return;
    }

    const messages = await getMessagesForMatch(contact.matchId, token);
    this.selectedContact.messages = messages.map((message) => ({
      text: message.content,
      time: message.createdAt,
      sender: message.senderId === this.currentUserId ? "me" : "them",
    }));
  } catch (error) {
    console.error("Error loading messages:", error);
    alert("Không thể tải tin nhắn.");
  }
},


    async sendMessage() {
      if (
        !this.newMessage ||
        typeof this.newMessage !== "string" ||
        this.newMessage.trim() === ""
      ) {
        alert("Nội dung tin nhắn không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("userToken");
        if (!token || typeof token !== "string" || token === "1") {
          console.error("Token không hợp lệ:", token);
          alert("Vui lòng đăng nhập lại.");
          return;
        }

        console.log(
          "Sending message with matchId:",
          this.selectedContact.matchId
        );
        console.log("Token being used:", token);
        console.log("Content:", this.newMessage);

        // Gửi tin nhắn tới server
        const sentMessage = await sendMessageToMatch(
          this.selectedContact.matchId,
          this.newMessage,
          token
        );

        // Thêm tin nhắn vào giao diện chat
        this.selectedContact.messages.push({
          text: sentMessage.content,
          time: sentMessage.createdAt,
          sender: "me",
        });

        // Reset input sau khi gửi tin nhắn
        this.newMessage = "";
      } catch (error) {
        console.error("Error sending message:", error);
        alert(
          `Không thể gửi tin nhắn: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    },

    callUser() {
      alert("Đang gọi điện...");
    },
    videoCallUser() {
      alert("Đang thực hiện cuộc gọi video...");
    },
    viewInfo() {
      alert("Hiển thị thông tin người dùng...");
    },
  },
  async mounted() {
    // Giả sử userToken là JWT và bạn có thể giải mã nó để lấy thông tin userId
  const token = this.token;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.userId; // Lấy userId từ payload của JWT
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
    await this.getMatchesForUser(); // Gọi hàm loadContacts khi component được mount để lấy dữ liệu contacts
  },
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar-chat {
  width: 450px !important; /* Thêm !important để đảm bảo quy tắc được áp dụng */
  background-color: #fafafa;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
}

.profile {
  padding: 5px;
  margin-left: 20px;
  margin-top: 40px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  font-size: 19px;
}

.contact-item:hover {
  background-color: #f1f1f1;
}

.contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: bold;
}

.contact-message {
  font-size: 14px;
  color: #888;
}

.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.chat-header {
  display: flex;
  justify-content: space-between; /* Đảm bảo khoảng cách giữa avatar và các nút */
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #e6e6e6;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Đảm bảo nội dung chat nằm ở cuối */
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  max-width: 70%; /* Giới hạn độ rộng tối đa của tin nhắn */
  word-wrap: break-word; /* Cho phép ngắt dòng nếu văn bản quá dài */
}

.other-message {
  justify-content: flex-start; /* Tin nhắn của người nhận căn về bên trái */
}

.my-message {
  justify-content: flex-end; /* Tin nhắn của người gửi căn về bên phải */
  align-self: flex-end; /* Căn tin nhắn của người gửi về bên phải của chính khung chat */
  background-color: #3897f0;
  color: white;
  border-radius: 15px;
  max-width: fit-content; /* Đảm bảo chiều rộng tự động thay đổi theo nội dung */
}

.message p {
  margin: 0;
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 15px;
  display: inline-block; /* Để tin nhắn co lại theo nội dung */
  width: auto; /* Đảm bảo chiều rộng tự động thay đổi theo nội dung */
}

.my-message p {
  background-color: #3897f0;
  color: white;
  display: inline-block; /* Để tin nhắn co lại theo nội dung */
  width: auto; /* Đảm bảo chiều rộng tự động thay đổi theo nội dung */
  max-width: fit-content; /* Giới hạn chiều rộng tối đa theo nội dung */
}

.other-message p {
  background-color: #f1f1f1; /* Màu nền của tin nhắn người nhận */
}

.message small {
  font-size: 12px;
  color: #888;
  margin-left: 10px;
}

.my-message small {
  margin-left: 10px;
  color: #ddd;
}

.chat-window {
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
}

.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #e6e6e6;
}

.chat-input input {
  flex: 1;
  padding: 15px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 16px;
}

.chat-input button {
  background-color: #3897f0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0073e6;
}

.chat-controls {
  display: flex;
  gap: 10px; /* Khoảng cách giữa các nút */
}

.chat-control-button {
  background: none;
  border: none;
  font-size: 24px; /* Kích thước của biểu tượng Material Icons */
  cursor: pointer;
  color: #000;
}

.chat-control-button:hover {
  color: #0073e6; /* Đổi màu khi di chuột */
}

.material-icons {
  font-size: 24px; /* Kích thước biểu tượng Material Icons */
}
</style>
