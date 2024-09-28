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
          v-for="(contact, index) in contacts"
          :key="index"
          class="contact-item"
          @click="selectContact(contact)"
        >
          <img
            :src="contact.profileImage"
            alt="Contact Image"
            class="contact-avatar"
          />
          <div class="contact-info">
            <span class="contact-name">{{ contact.name }}</span>
            <span class="contact-message">{{ contact.message }}</span>
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

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      profileName: "Message",
      contacts: [
        {
          name: "Văn A",
          message: "Đang hoạt động",
          profileImage: "https://i.pinimg.com/736x/c4/20/f9/c420f9bec9be8fa4a4e453dae12976e0.jpg",
          messages: [],
        },
        {
          name: "22.Nastore",
          message: "Hoạt động 10 phút trước",
          profileImage: "https://i.pinimg.com/236x/76/18/38/761838420398ec0b0b412b46b71f2ab2.jpg",
          messages: [],
        },
        {
          name: "Jack Lane",
          message: "Hoạt động 30 phút trước",
          profileImage: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bfae8f52-0040-4112-bfd1-5a8bf6f939db/width=450/00000-3205839809.jpeg",
          messages: [
            { text: "Bạn ơi,...", time: "17:20 11/6/22", sender: "them" },
            { text: "Xin chào", time: "16:35 17/12/23", sender: "me" },
          ],
        },
      ],
      selectedContact: null,
      newMessage: "",
    };
  },
  methods: {
    selectContact(contact) {
      this.selectedContact = contact;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const sentMessage = {
          text: this.newMessage,
          time: new Date().toLocaleTimeString(),
          sender: "me",
        };
        this.selectedContact.messages.push(sentMessage);
        
        // Reset input sau khi gửi tin nhắn
        this.newMessage = "";

        // Thêm chức năng trả lời tự động
        setTimeout(() => {
          const autoReplyMessage = {
            text: "Xin chào!",
            time: new Date().toLocaleTimeString(),
            sender: "them", // Tin nhắn từ hệ thống hoặc người khác
          };
          this.selectedContact.messages.push(autoReplyMessage);
        }, 1000); // Trả lời tự động sau 1 giây
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
    }
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
  width: 300px;
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
