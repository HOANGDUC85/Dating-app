<template>
    <div class="notification-container">
      <h2>Thông báo</h2>
      <div class="notification-follow-request">
        <img class="profile-pic" src="https://via.placeholder.com/40" alt="profile" />
        <div class="notification-content">
          <p>
            <strong>mitsubishi.16</strong> + 1 người khác
          </p>
          <p>Yêu cầu theo dõi</p>
        </div>
      </div>
  
      <h3>Trước đó</h3>
  
      <div class="notification-item" v-for="(item, index) in notifications" :key="index">
        <img class="profile-pic" src="https://via.placeholder.com/40" alt="profile" />
        <div class="notification-content">
          <p>
            <strong>{{ item.username }}</strong> {{ item.action }}
          </p>
          <p>{{ item.time }}</p>
        </div>
        <button v-if="item.action === 'đã bắt đầu theo dõi bạn'" class="follow-btn">Theo dõi</button>
        <div v-if="item.action === 'yêu cầu theo dõi bạn'">
          <button class="confirm-btn">Xác nhận</button>
          <button class="delete-btn">Xóa</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [
          {
            username: "iam_nqchou",
            action: "đã thích tin của bạn.",
            time: "5 tuần"
          },
          {
            username: "iam_nqchou",
            action: "đã bắt đầu theo dõi bạn",
            time: "6 tuần"
          },
          {
            username: "mitsubishi.16",
            action: "yêu cầu theo dõi bạn",
            time: "7 tuần"
          },
          {
            username: "kimgnn01 và _giankorn_",
            action: "đã thích tin của bạn.",
            time: "10 tuần"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .notification-container {
    max-width: 400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  h3 {
    font-size: 16px;
    margin: 15px 0 10px;
  }
  
  .notification-follow-request,
  .notification-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
  }
  
  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .notification-content {
    flex-grow: 1;
  }
  
  .notification-content p {
    margin: 0;
  }
  
  strong {
    font-weight: bold;
  }
  
  .follow-btn,
  .confirm-btn,
  .delete-btn {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .follow-btn {
    background-color: #0095f6;
    color: white;
    border: none;
  }
  
  .confirm-btn {
    background-color: #0095f6;
    color: white;
    border: none;
    margin-right: 5px;
  }
  
  .delete-btn {
    background-color: transparent;
    color: #262626;
    border: 1px solid #dbdbdb;
  }
  </style>
  