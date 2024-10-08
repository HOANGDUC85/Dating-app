<template>
    <div class="edit-profile-page">
      <h2>Chỉnh sửa trang cá nhân</h2>
      
      <form @submit.prevent="saveProfile">
        <!-- Avatar -->
        <div class="form-group">
          <label for="avatar">Ảnh đại diện:</label>
          <input type="text" id="avatar" v-model="profileData.avatar" placeholder="URL ảnh đại diện" />
        </div>
  
        <!-- Name -->
        <div class="form-group">
          <label for="name">Tên:</label>
          <input type="text" id="name" v-model="profileData.name" placeholder="Nhập tên của bạn" />
        </div>
  
        <!-- Age -->
        <div class="form-group">
          <label for="age">Tuổi:</label>
          <input type="number" id="age" v-model="profileData.age" placeholder="Nhập tuổi" />
        </div>
  
        <!-- Gender -->
        <div class="form-group">
          <label for="gender">Giới tính:</label>
          <select id="gender" v-model="profileData.gender">
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
  
        <!-- Bio -->
        <div class="form-group">
          <label for="bio">Tiểu sử:</label>
          <textarea id="bio" v-model="profileData.bio" placeholder="Giới thiệu bản thân..."></textarea>
        </div>
  
        <!-- Photos -->
        <div class="form-group">
          <label for="photos">Ảnh khác:</label>
          <div v-for="(photo, index) in profileData.photos" :key="index" class="photo-input">
            <input type="text" v-model="photo.url" placeholder="URL ảnh" />
            <button type="button" @click="removePhoto(index)">Xóa</button>
          </div>
          <button type="button" @click="addPhoto">Thêm ảnh</button>
        </div>
  
        <!-- Submit Button -->
        <div class="form-group">
          <button type="submit">Lưu thay đổi</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { getMyProfile, updateProfile } from "@/services/viewProfile-service.js"; // Import hàm lấy và cập nhật profile
  
  export default {
    data() {
      return {
        profileData: {
          avatar: "", // Avatar URL
          name: "", // Name
          age: "", // Age
          gender: "", // Gender
          bio: "", // Bio
          photos: [] // Photos array
        }
      };
    },
    async mounted() {
      try {
        // Gọi API lấy thông tin profile người dùng
        const profileResponse = await getMyProfile();
        const profile = profileResponse.data; // Lấy data từ response
        
        // Gán dữ liệu từ API vào profileData
        this.profileData.avatar = profile.avatar || "";
        this.profileData.name = profile.name || "";
        this.profileData.age = profile.age || "";
        this.profileData.gender = profile.gender || "";
        this.profileData.bio = profile.bio || "";
        this.profileData.photos = profile.photos || [];
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    },
    methods: {
      // Thêm một ô input ảnh mới
      addPhoto() {
        this.profileData.photos.push({ url: "" });
      },
      // Xóa ảnh theo index
      removePhoto(index) {
        this.profileData.photos.splice(index, 1);
      },
      // Gọi API cập nhật thông tin profile
      async saveProfile() {
        try {
          const response = await updateProfile(this.profileData);
          if (response.status === 200) {
            alert("Cập nhật thành công!");
            // Chuyển về trang profile sau khi cập nhật thành công
            this.$router.push("/profile");
          }
        } catch (error) {
          console.error("Error saving profile data:", error);
          alert("Đã xảy ra lỗi khi cập nhật thông tin.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-profile-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  .photo-input {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .photo-input input {
    flex: 1;
    margin-right: 10px;
  }
  
  .photo-input button {
    background-color: #ff4b4b;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  