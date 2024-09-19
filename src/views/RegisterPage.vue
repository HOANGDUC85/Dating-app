<template>
  <div class="login-page-container">
    <!-- Logo section -->
    <div class="logo-container">
      <div class="logo">
        <img :src="require('@/assets/lovebell.jpg')" alt="Logo" />
        <h1>LOVE-BELL</h1>
      </div>
    </div>

    <!-- Form section -->
    <div class="form-container">
      <!-- Create account text -->
      <h2>Create an account</h2>
      <p>Enter your email to sign up for this app</p>

      <!-- Email input field -->
      <input type="email" v-model="email" placeholder="email@domain.com" class="email-input" />

      <!-- Sign up with email button -->
      <button @click="signUpWithEmail" class="sign-up-email-button">Sign up with email</button>

      <!-- OR separator -->
      <div class="separator">
        <span>or continue with</span>
      </div>

      <!-- Sign in options -->
      <button @click="signUpWithGoogle" class="google-login-button">
        <img src="google-icon.png" alt="Google Icon" /> LOG IN WITH GOOGLE
      </button>

      <button @click="signUpWithPhoneNumber" class="phone-login-button">
        LOG IN WITH PHONE NUMBER
      </button>

      <button @click="signUpWithFacebook" class="facebook-login-button">
        LOG IN WITH FACEBOOK
      </button>

      <!-- Forgot password link -->
      <p class="forgot-password" @click="goToForgotPass">Forgot your password?</p>

      <!-- Terms of Service and Privacy Policy -->
      <p class="terms">
        By clicking continue, you agree to our 
        <a href="#">Terms of Service</a> and 
        <a href="#">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: ''
    };
  },
  methods: {
    signUpWithEmail() {
      alert(`Signing up with email: ${this.email}`);
    },
    signUpWithGoogle() {
      alert('Signing up with Google');
    },
    signUpWithPhoneNumber() {
      alert('Signing up with Phone Number');
    },
    signUpWithFacebook() {
      alert('Signing up with Facebook');
    },
    goToForgotPass() {
      this.$router.push("/forgotpass"); // Điều hướng đến trang Forgot Password
    }
  }
};
</script>

<style scoped>
/* Thay đổi màu nền của toàn bộ trang */
body {
  background-color: #ffb3c1; /* Màu hồng nền */
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.login-page-container {
  display: flex;
  height: 100vh; /* Chiều cao bằng toàn bộ trang */
  justify-content: center; /* Căn giữa nội dung */
  align-items: center; /* Căn giữa nội dung theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các phần tử */
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Màu nền của phần logo */
  border-radius: 10px; /* Bo góc cho phần logo */
  padding: 20px; /* Thêm padding cho phần logo */
  margin-right: 20px; /* Khoảng cách bên phải */
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
}

.form-container {
  width: 100%;
  max-width: 400px; /* Kích thước tối đa cho phần form */
  padding: 20px;
  background-color: #fff; /* Màu nền của phần form */
  border-radius: 10px; /* Bo góc cho phần form */
}

h2 {
  color: #ff4d95;
  margin-top: 0;
}

p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.email-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.sign-up-email-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.separator {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.separator span {
  flex-grow: 1;
  text-align: center;
  color: #999;
}

.google-login-button, .phone-login-button, .facebook-login-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.google-login-button {
  background-color: #fff;
  color: #555;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-login-button img {
  margin-right: 10px;
}

.phone-login-button {
  background-color: black;
}

.facebook-login-button {
  background-color: #3b5998;
}

.terms {
  color: #999;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.terms a {
  color: #ff4d95;
  text-decoration: none;
}
</style>
