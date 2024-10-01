<template>
  <div>
    <div class="app">
      <!-- Left Sidebar (LoveBellSidebar) -->
      <div class="sidebar">
        <LoveBellSidebar />
      </div>
      <!-- Right Content (Profile Header and Photo Grid) -->
      <div class="content">
        <!-- Profile Header -->
        <div class="profile-header">
          <img :src="require('@/assets/logo.png')" alt="Profile Image" class="profile-image" />
          <div class="profile-info">
            <h2>{{ profileData.name }} - {{ profileData.age }} - {{ profileData.gender }}</h2>
            <p>{{ profileData.bio }}</p>
          </div>
        </div>

        <!-- Photo Grid -->
        <div class="photo-grid">
          <div v-for="(photo, index) in profileData.photos" :key="index" class="photo-item">
            <img :src="photo.url" alt="Photo Thumbnail" class="photo-thumbnail" />
            <p class="photo-title">Photo {{ index + 1 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { getProfileById } from "@/services/viewProfile-service.js"; // Import hàm đã sửa đổi
import { getLoggedInUser } from "@/services/auth-service.js";

export default {
  data() {
    return {
      profileData: {
        userId: "", // Avatar URL
        name: "", // Name
        age: "", // Age
        gender: "", // Gender
        bio: "", // Bio
        photos: [] // Photos array
      },
      loggedInUser: null // Thông tin người dùng đã đăng nhập
    };
  },
  components: {
    LoveBellSidebar,
  },
  async mounted() {
    try {
      // Lấy thông tin người dùng đã đăng nhập từ token
      this.loggedInUser = getLoggedInUser();
      console.log("🚀 ~ mounted ~ loggedInUser:", this.loggedInUser);

      if (this.loggedInUser && this.loggedInUser.userId) {
        // Fetch the profile data từ backend bằng userId của người dùng đã đăng nhập
        const profile = await getProfileById(this.loggedInUser.userId);
        
        // Gán dữ liệu từ backend vào profileData
        this.profileData.name = profile.name || "Unnamed User";
        this.profileData.age = profile.age || "Unknown";
        this.profileData.gender = profile.gender || "Unknown";
        this.profileData.bio = profile.bio || "No bio available";
        this.profileData.photos = profile.photos || [];
      } else {
        console.error("No logged-in user found.");
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  }
};
</script>

<style>
/* Các style không thay đổi */
.app {
  display: flex;
  font-family: Arial, sans-serif;
  padding: 20px;
  gap: 20px; /* Gap between sidebar and content */
}

.sidebar {
  flex: 1; 
}

.content {
  flex: 5; /* Right column for profile and photos */
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.stats {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

/* Photo Grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 8px; /* Smaller gap between the photos */
}

.photo-item {
  text-align: center;
}

.photo-thumbnail {
  width: 90%; /* Smaller thumbnails */
  height: auto;
  border-radius: 8px;
  object-fit: cover; /* Ensures that the image fits nicely */
}

.photo-title {
  margin-top: 5px;
  font-size: 14px; /* Smaller text size for photo titles */
  font-weight: bold;
}
</style>
