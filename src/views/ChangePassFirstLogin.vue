<template>
    <div class="login-page-container">
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
          <h2>Change Your Password</h2>
          <p>Please update your password to continue using the app</p>
  
          <!-- Current Password input field -->
          <input
            type="password"
            v-model="currentPassword"
            placeholder="Current Password"
            class="password-input"
          />
  
          <!-- New Password input field -->
          <input
            type="password"
            v-model="newPassword"
            placeholder="New Password"
            class="password-input"
          />
  
          <!-- Confirm Password input field -->
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm New Password"
            class="password-input"
          />
  
          <p v-if="passwordMismatch" class="password-error">
            New password and confirmation do not match.
          </p>
  
          <!-- Change password button -->
          <button @click="changePassword" class="change-password-button">
            Change Password
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { loginUser } from '@/services/login-service';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async loginWithEmail() {
        try {
          const response = await loginUser(this.email, this.password);
          if (response.status === 200) {
            alert('Login successful! User ID: ' + response.data);
            this.$router.push('/homePage'); // Chuyển hướng sau khi đăng nhập thành công
          }
        } catch (error) {
          alert('Login failed: ' + error.message);
        }
      },
      loginWithGoogle() {
        alert('Logging in with Google');
      },
      loginWithPhoneNumber() {
        alert('Logging in with Phone Number');
      },
      loginWithFacebook() {
        alert('Logging in with Facebook');
      },
      goToForgotPass() {
        this.$router.push('/forgotpass');
      },
      goToLogin() {
        this.$router.push('/register');
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: #ffb3c1;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  
  .login-page-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #ff85a1;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-right: 20px;
  }
  
  .white-container {
    display: flex;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 50px;
  }
  
  .logo img {
    width: 300px;
    height: auto;
    margin-bottom: 40px;
  }
  
  h1 {
    color: #ff4d95;
    font-size: 36px;
    margin: 10px 0;
    text-align: center;
  }
  
  .form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
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
  
  .password-input {
    width: 95%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
  
  .password-error {
    color: red;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .change-password-button {
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
  
  .change-password-button:hover {
    background-color: #ed94b8;
  }
  </style>
  