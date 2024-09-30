<template>
    <div class="forgot-password-page-container">
      <div class="white-container">
        <!-- Logo section -->
        <div class="logo-container">
          <div class="logo">
            <img :src="require('@/assets/lovebell.jpg')" alt="Logo" />
            <h1>LOVE-BELL</h1>
          </div>
        </div>
  
        <!-- Form section -->
        <div class="form-container">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
  
          <!-- Email input field -->
          <input
            type="email"
            v-model="email"
            placeholder="email@domain.com"
            class="email-input"
          />
  
          <!-- Forgot password button -->
          <button @click="sendResetLink" class="send-reset-link-button">
            Send Reset Link
          </button>
  
          <!-- Back to login link -->
          <p class="back-to-login">
            Remember your password?
            <a @click="goToLogin" class="login-link">Back to login</a>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
// Import dịch vụ đã tạo
import { sendResetPasswordRequest } from '@/services/forgot-password-service';

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async sendResetLink() {
      if (!this.email) {
        alert('Please enter your email.');
        return;
      }

      try {
        // Gọi dịch vụ gửi yêu cầu reset mật khẩu
        const response = await sendResetPasswordRequest(this.email);
        
        // Xử lý phản hồi thành công
        if (response.status === 200) {
          alert('Reset link sent to your email.');
        } else {
          alert('Error sending reset link.');
        }
      } catch (error) {
        // Xử lý lỗi khi gửi yêu cầu
        alert('Failed to send reset link: ' + error.message);
      }
    },
    goToLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Thay đổi màu nền của toàn bộ trang */
body {
  background-color: #ffb3c1;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.forgot-password-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ff85a1;
}

.white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.logo img {
  width: 300px; /* Điều chỉnh kích thước hình ảnh */
  height: auto;
  margin-bottom: 40px;
}

h1 {
  color: #ff4d95;
  font-size: 36px; /* Kích thước chữ logo */
  margin: 10px 0;
  text-align: center;
}

h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
}

p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.email-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.send-reset-link-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.send-reset-link-button:hover {
  background-color: #ed94b8;
}

.back-to-login {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #ff4d95;
  text-decoration: none;
  cursor: pointer;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
