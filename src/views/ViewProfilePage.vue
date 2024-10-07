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
          <img :src="profileData.avatar" alt="Profile Image" class="profile-image" />
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
import { getMyProfile } from "@/services/viewProfile-service.js"; // Import hàm lấy profile

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
  components: {
    LoveBellSidebar,
  },
  async mounted() {
    try {
      // Gọi API lấy thông tin profile người dùng
      const profileResponse = await getMyProfile();
      const profile = profileResponse.data; // Lấy data từ response
      
      // Gán dữ liệu từ API vào profileData
      this.profileData.avatar = profile.avatar || "Unnamed User";
      this.profileData.name = profile.name || "Unnamed User";
      this.profileData.age = profile.age || "Unknown";
      this.profileData.gender = profile.gender || "Unknown";
      this.profileData.bio = profile.bio || "No bio available";
      this.profileData.photos = profile.photos || [];
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
