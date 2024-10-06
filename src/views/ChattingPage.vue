<template>
  <div class="chat-app">
    <LoveBellSidebar />

    <!-- Sidebar -->
    <div class="sidebar">
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
            <span class="contact-message">{{ contact.targetUserName }}</span>
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
        <div
          class="message"
          v-for="(message, index) in selectedContact.messages"
          :key="index"
          :class="{ 'my-message': message.sender === 'me' }"
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
      <div v-if="selectedContact" class="chat-input">
        <input v-model="newMessage" placeholder="Nhắn tin..." />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { getMatchesForUser, getMessagesForMatch, sendMessageToMatch } from "@/services/match-service"; // Import API gửi tin nhắn

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
      userId: 2, // Thay bằng ID thực của người dùng đăng nhập
    };
  },
  methods: {
    async getMatchesForUser() {
      try {
        const userId = this.userId; // Lấy ID của người dùng hiện tại

        const contactsData = await getMatchesForUser(userId); // Gọi API để lấy danh sách contacts
        this.contacts = contactsData; // Cập nhật danh sách contacts
      } catch (error) {
        console.error("Error loading contacts:", error.message);
      }
    },
    async selectContact(contact) {
      try {
        this.selectedContact = contact;

        // Gọi API để lấy danh sách tin nhắn cho matchId
        const messages = await getMessagesForMatch(contact.matchId);
        // Gán danh sách tin nhắn cho selectedContact
        this.selectedContact.messages = messages.map(message => ({
          text: message.content,
          sender: message.senderId === this.userId ? "me" : "them",
          time: message.createdAt, // Sử dụng định dạng thời gian từ API
        }));
      } catch (error) {
        console.error("Error loading messages:", error.message);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        // Gửi tin nhắn thông qua API
        try {
          const message = await sendMessageToMatch(
            this.selectedContact.matchId,
            this.userId, // ID của người gửi
            this.selectedContact.targetUserId, // ID của người nhận
            this.newMessage // Nội dung tin nhắn
          );

          // Sau khi gửi thành công, thêm tin nhắn vào giao diện
          const sentMessage = {
            text: message.content,
            time: message.createdAt,
            sender: "me",
          };

          this.selectedContact.messages.push(sentMessage);

          // Reset input sau khi gửi tin nhắn
          this.newMessage = "";
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
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

.sidebar {
  width: 250px !important; /* Thêm !important để đảm bảo quy tắc được áp dụng */
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

.my-message {
  justify-content: flex-end;
  background-color: #3897f0;
  color: white;
  align-self: flex-end;
  width: auto; /* Đảm bảo chiều rộng tự động thay đổi theo nội dung */
  max-width: fit-content; /* Đảm bảo chiều rộng không vượt quá nội dung */
  border-radius: 15px;
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
