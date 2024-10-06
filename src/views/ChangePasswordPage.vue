<template>
    <div class="change-password-container">
      <h2>Change Password</h2>
  
      <!-- Current Password -->
      <input type="password" v-model="currentPassword" placeholder="Current Password" class="input-field" />
  
      <!-- New Password -->
      <input type="password" v-model="newPassword" placeholder="New Password" class="input-field" />
  
      <!-- Confirm New Password -->
      <input type="password" v-model="confirmNewPassword" placeholder="Confirm New Password" class="input-field" />
  
      <!-- Change Password Button -->
      <button @click="changePassword" class="change-password-button">Change Password</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChangePasswordPage",
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
    },
    methods: {
      changePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
          alert('Passwords do not match!');
          return;
        }
        // Gửi request để đổi mật khẩu
        alert('Password changed successfully!');
      }
    }
  };
  </script>
  
  <style scoped>
  .change-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  h2 {
    color: #ff4d95;
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
  
  .change-password-button {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    background-color: #ff4d95;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  