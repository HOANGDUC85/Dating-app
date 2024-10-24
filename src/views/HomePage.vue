<template>
  <head>
    <!-- FontAwesome CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>

  <div id="app">
    <div class="main-layout">
      <!-- LoveBell Sidebar -->
      <LoveBellSidebar />

      <!-- Sidebar for matches -->
      <aside class="sidebarMatch">
        <div class="sidebar-header">
          <h3>Compatible Objects</h3>
        </div>
        <div class="matches-grid" v-if="matches && matches.length > 0">
          <!-- Hiển thị các đối tượng tương hợp nếu có -->
          <div
            class="match-item"
            v-for="match in matches"
            :key="match.targetUserId"
          >
            <img
              :src="getAuthorizedImageUrl(match.targetUserAvatar)"
              class="match-image"
              alt="Match Avatar"
            />
            <div class="match-info">
              <span class="match-name">{{ match.targetUserName }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content area: Profile card -->
      <div
        class="profile-section"
        v-if="
          currentProfile && (currentProfile.avatar || currentProfile.imageUrl)
        "
      >
        <transition name="swipe" @after-enter="resetCardPosition">
          <div
            class="profile-card"
            :key="profileIndex + '-' + currentProfile.profileId"
            :class="{
              'swipe-left': swipeLeft,
              'swipe-right': swipeRight,
              'show-like': showLike,
              'show-dislike': showDislike,
            }"
          >
            <img
              v-if="currentProfile.avatar || currentProfile.imageUrl"
              :src="
                getAuthorizedImageUrl(
                  currentProfile.avatar || currentProfile.imageUrl
                )
              "
              alt="Profile Image"
              class="profile-image-card"
            />
            <div class="like-dislike-text" v-if="showLike">LIKE</div>
            <div class="like-dislike-text" v-if="showDislike">DISLIKE</div>
            <div class="profile-info">
              <div class="profile-header-name">
                <h2>{{ currentProfile.name }} - {{ currentProfile.age }}</h2>
                <div class="profile-kilometer">
                  <button class="info-button" @click="showProfileInfo">
                    <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                Cách xa {{ getRandomDistance() }} km
              </p>
            </div>
            <div class="action-buttons">
              <button class="button dislike-button" @click="dislike">
                <i class="fas fa-times"></i>
              </button>
              <button class="button super-like-button" @click="superLike">
                <i class="fas fa-star"></i>
              </button>
              <button class="button like-button" @click="like">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Modal Popup -->
      <div v-if="showInfo" class="modal-overlay" @click="closeModal">
        <div class="modal-content full-image-modal" @click.stop>
          <button class="close-button" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
          <h2>{{ currentProfile.name }} - {{ currentProfile.age }}</h2>
          <p>{{ currentProfile.bio }}</p>
          <div
            class="images-wrapper"
            v-if="currentProfile"
            :key="profileIndex"
            :class="{
              'swipe-left': swipeLeft,
              'swipe-right': swipeRight,
              'show-like': showLike,
              'show-dislike': showDislike,
            }"
          >
            <img
              v-if="currentProfile.imageUrl"
              :src="getAuthorizedImageUrl(currentProfile.imageUrl)"
              alt="Profile Image"
              class="profile-image"
            />
            <div class="like-dislike-text" v-if="showLike">LIKE</div>
            <div class="like-dislike-text" v-if="showDislike">DISLIKE</div>
          </div>
          <div class="action-buttons-modal">
            <button class="button dislike-button" @click="dislike">
              <i class="fas fa-times"></i>
            </button>
            <button class="button super-like-button" @click="superLike">
              <i class="fas fa-star"></i>
            </button>
            <button class="button like-button" @click="like">
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { getMatchesForUser } from "@/services/match-service";
import { loadRandomProfile } from "@/services/profile-service";
import { swipeAction } from "@/services/swipe-service";

export default {
  name: "App",
  data() {
    return {
      currentProfileVisible: true,
      swipeLeft: false,
      swipeRight: false,
      showDislike: false, // Thêm biến để hiển thị "dislike"
      showLike: false, // Thêm biến để hiển thị "like"
      currentProfile: {}, // Khởi tạo đối tượng rỗng thay vì null
      profileIndex: 0, // Chỉ số của hồ sơ hiện tại trong danh sách

      likedProfiles: [], // Danh sách các hồ sơ đã thích
      dislikedProfiles: [], // Danh sách các hồ sơ đã không thích
      matches: [], // Dữ liệu các hồ sơ
      profileImageUrl: null, // Thêm biến này để lưu URL của ảnh profile
      showInfo: false, // Biến để kiểm soát hiển thị modal
    };
  },
  components: {
    LoveBellSidebar,
  },
  methods: {
    async loadMatches() {
      try {
        const matchData = await getMatchesForUser();
        console.log("Match data:", matchData);
        this.matches = matchData;
      } catch (error) {
        console.error("Error loading matches:", error.message);
        // alert("Unable to load matches. Please try again later.");
      }
    },

    async loadProfiles() {
      try {
        const profileData = await loadRandomProfile();
        console.log("Profiles loaded:", profileData);

        if (profileData.length > 0) {
          this.profiles = [...profileData]; // Use the spread operator to ensure a new array is created
          this.profileIndex = 0;
          this.currentProfile = { ...this.profiles[this.profileIndex] };
          console.log("Current Profile set:", this.currentProfile);
        } else {
          console.warn("No profiles available.");
          alert("No profiles found. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to load profiles:", error);
      }
    },

    async nextProfile() {
      this.currentProfileVisible = false;

      setTimeout(async () => {
        try {
          await this.loadProfiles();
          if (this.currentProfile && this.profiles.length > 0) {
            // Ensure that Vue reacts to this new object
            this.currentProfile = { ...this.profiles[this.profileIndex] };
            console.log("New profile loaded:", this.currentProfile);
          } else {
            console.log("No more profiles available.");
            // Show an alert or notification when no profiles are left
            alert(
              "You have viewed all available profiles. Please try again later."
            );
            this.currentProfile = null; // Optional: Clear the current profile display
          }
        } catch (error) {
          console.error("Error loading new profile:", error);
          alert("Unable to load new profile. Please try again.");
        } finally {
          this.currentProfileVisible = true;
        }
      }, 500);
    },

    like() {
      if (!this.currentProfile || !this.currentProfile.userId) {
        console.error("targetUserId is missing:", this.currentProfile);
        alert("Unable to perform swipe action due to missing profile data.");
        return;
      }

      swipeAction(this.currentProfile.userId, true)
        .then((response) => {
          console.log("Swipe action completed:", response);
          this.likedProfiles.push(this.currentProfile);
          this.swipeRight = true;
          this.swipeLeft = false;
          this.showLike = true;

          // Automatically load a new profile after the like action
          setTimeout(() => {
            this.showLike = false;
            this.nextProfile(); // Call the function to load a new profile
          }, 500);
        })
        .catch((error) => {
          console.error("Error during swipe action:", error.message);
          alert("Có lỗi xảy ra khi thực hiện hành động like.");
        });
    },

    dislike() {
      if (!this.currentProfile || !this.currentProfile.userId) {
        console.error("targetUserId is missing:", this.currentProfile);
        alert("Unable to perform swipe action due to missing profile data.");
        return;
      }

      swipeAction(this.currentProfile.userId, false)
        .then((response) => {
          console.log("Swipe action completed:", response);
          this.dislikedProfiles.push(this.currentProfile);
          this.swipeLeft = true;
          this.swipeRight = false;
          this.showDislike = true;

          // Automatically load a new profile after the dislike action
          setTimeout(() => {
            this.showDislike = false;
            this.nextProfile(); // Call the function to load a new profile
          }, 500);
        })
        .catch((error) => {
          console.error("Error during swipe action:", error.message);
          alert("Có lỗi xảy ra khi thực hiện hành động dislike.");
        });
    },

    superLike() {
      alert("You super liked the profile");
    },
    changeProfile() {
      // Logic để chuyển đổi sang hồ sơ tiếp theo
      this.currentProfileVisible = false;
      setTimeout(() => {
        this.currentProfile =
          this.matches[Math.floor(Math.random() * this.matches.length)];
        this.currentProfileVisible = true;
      }, 500);
    },
    resetCardPosition() {
      this.swipeLeft = false;
      this.swipeRight = false;
    },
    showProfileInfo() {
      console.log(
        "Current Profile images (when showing modal):",
        this.currentProfile.images
      );
      this.showInfo = true;
    },

    // Phương thức đóng modal
    closeModal() {
      this.showInfo = false;
    },
    getAuthorizedImageUrl(url) {
      const token = localStorage.getItem("userToken");
      if (token) {
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}Authorization=Bearer ${token}`;
      } else {
        console.error("User token not found.");
        return url;
      }
    },

    getRandomDistance() {
      return Math.floor(Math.random() * 10) + 1;
    },
  },
  async mounted() {
    await this.loadMatches(); // Tải danh sách matches khi component được mounted
    await this.loadProfiles(); // Gọi API khi component được mounted
  },
};
</script>

<style scoped>
/* Main Layout */
.main-layout {
  display: flex;
  height: calc(100vh - 56px);
}

/* Sidebar */
.sidebarMatch {
  width: 30%;
  background-color: #f6f6f6;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  text-align: center;
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
}

/* Tạo layout dạng lưới cho các đối tượng tương hợp */
.matches-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Chia lưới thành 3 cột */
  gap: 20px;
  padding-top: 20px;
}

.match-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.match-image {
  width: 100px;
  height: 100px;
  border-radius: 20%;
  object-fit: cover;
  margin-bottom: 10px;
}

.match-name {
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

/* Profile Section */
.profile-section {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}

.profile-card {
  width: 550px;
  text-align: center;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.profile-image-card {
  width: 450px;
  height: 500px;
  border-radius: 10px;
  object-fit: cover; /* Đảm bảo ảnh phù hợp với container */
}
.profile-info {
  text-align: left;
  font-size: 18px;
}
.profile-info h2 {
  margin: 10px 0;
}

.profile-info i {
  margin-right: 5px; /* Thêm khoảng cách giữa biểu tượng và đoạn văn */
  color: black; /* Đặt màu trắng cho biểu tượng */
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}

.button {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.button::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(45deg, red, orange);
  z-index: -1;
}

.super-like-button::before {
  background: linear-gradient(45deg, blue, cyan);
}

.like-button::before {
  background: linear-gradient(45deg, green, lime);
}

.button:hover {
  transform: scale(1.1);
}

.button:active {
  transform: scale(0.95);
}

.button i {
  font-size: 1.5rem;
}

/* Nút Dislike (Màu đỏ) */
.dislike-button i {
  color: #ff5a5f;
}

/* Nút Super Like (Màu xanh dương) */
.super-like-button i {
  color: #3498db;
}

/* Nút Like (Màu xanh lá cây) */
.like-button i {
  color: #2ecc71;
}

.button:hover i {
  color: white;
}

/* Swipe effect classes */
.swipe-left {
  transform: translateX(-400px);
  opacity: 0;
}

.swipe-right {
  transform: translateX(400px);
  opacity: 0;
}

/* Transition Effect */
.swipe-enter-active,
.swipe-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Đặt vị trí của "LIKE" và "DISLIKE" lên góc trên của ảnh */
.like-dislike-text {
  position: absolute;
  top: 20px; /* Đặt chữ ở góc trên */
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

/* Hiển thị "like" ở góc trên bên trái */
.show-like .like-dislike-text {
  right: 20px; /* Vị trí góc phải */

  opacity: 1;
  color: #2ecc71; /* Màu xanh lá cây cho "like" */
}

/* Hiển thị "dislike" ở góc trên bên phải */
.show-dislike .like-dislike-text {
  left: 20px; /* Vị trí góc trái */

  opacity: 1;
  color: #ff5a5f; /* Màu đỏ cho "dislike" */
}
.profile-header-name {
  display: flex;
  justify-content: space-between;
}

.profile-name {
  margin: 0;
  flex: 1;
}
.info-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #3498db;
  transition: transform 0.2s ease-in-out;
}

.info-button:hover {
  transform: scale(1.1);
}

.info-button:active {
  transform: scale(0.95);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 700px;
  width: 100%;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.close-button:hover {
  transform: scale(1.1);
}

.close-button:active {
  transform: scale(0.95);
}

/* Image Wrapper */
.images-wrapper {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.image-item {
  flex: 1;
  text-align: center;
}

.profile-image-modal {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.image-label {
  margin-top: 5px;
  font-size: 14px;
  color: #555;
}

/* Action Buttons in Modal */
.action-buttons-modal {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.button {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #ddd; /* Thêm viền cho nút */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.button::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(45deg, red, orange);
  z-index: -1;
}

.super-like-button::before {
  background: linear-gradient(45deg, blue, cyan);
}

.like-button::before {
  background: linear-gradient(45deg, green, lime);
}

.button:hover {
  transform: scale(1.1);
}

.button:active {
  transform: scale(0.95);
}

.button i {
  font-size: 1.5rem;
}

.dislike-button i {
  color: #ff5a5f;
}

.super-like-button i {
  color: #3498db;
}

.like-button i {
  color: #2ecc71;
}
</style>
