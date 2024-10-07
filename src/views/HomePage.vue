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
      <aside class="sidebar">
        <div class="sidebar-header">
          <h3>Compatible Objects</h3>
        </div>
        <div class="matches-grid">
          <div class="matches-grid">
            <div
              class="match-item"
              v-for="match in matches"
              :key="match.targetUserId"
            >
              <img
                :src="getAuthorizedImageUrl(match.targetUserAvatar)"
                class="match-image"
              />
              <div class="match-info">
                <span class="match-name">{{ match.targetUserName }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content area: Profile card -->
      <div class="profile-section">
        <transition name="swipe" @after-enter="resetCardPosition">
          <div
            class="profile-card"
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
              v-if="currentProfile.avatar || currentProfile.imageUrl"
              :src="
                getAuthorizedImageUrl(currentProfile.avatar)
                  ? getAuthorizedImageUrl(currentProfile.avatar)
                  : getAuthorizedImageUrl(currentProfile.imageUrl)
              "
              alt="profile image"
            />
            <div class="like-dislike-text" v-if="showLike">LIKE</div>
            <div class="like-dislike-text" v-if="showDislike">DISLIKE</div>
            <div class="profile-info">
              <h2>{{ currentProfile.name }} - {{ currentProfile.age }}</h2>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                Cách xa {{ currentProfile.distance }}
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
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { getMatchesForUser } from "@/services/match-service";
import { loadAllProfiles } from "@/services/profile-service";
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
      matches: [], // Dữ liệu các hồ sơ khác
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

        // Đặt profile hiện tại thành match đầu tiên
        if (this.matches.length > 0) {
          this.currentProfile = this.matches[0];
        }
      } catch (error) {
        console.error("Error loading matches:", error.message);
        alert("Unable to load matches. Please try again later.");
      }
    },

    async loadProfiles() {
      try {
        const profileData = await loadAllProfiles();
        console.log("Profiles loaded:", profileData);

        // Giả sử bạn lưu userId của người dùng hiện tại trong localStorage
        const currentUserId = parseInt(localStorage.getItem("userId"), 10);

        // Lọc danh sách hồ sơ để loại bỏ người dùng hiện tại và những người đã swipe
        const filteredProfiles = profileData.filter(
          (profile) =>
            profile.userId !== currentUserId &&
            !this.likedProfiles.some(
              (liked) => liked.userId === profile.userId
            ) &&
            !this.dislikedProfiles.some(
              (disliked) => disliked.userId === profile.userId
            )
        );

        // Lưu danh sách hồ sơ và đặt hồ sơ đầu tiên
        if (filteredProfiles.length > 0) {
          this.profiles = filteredProfiles;
          this.profileIndex = 0;
          this.currentProfile = this.profiles[this.profileIndex];
          console.log("Current Profile set:", this.currentProfile);
        } else {
          console.warn("No profiles available.");
          alert("No profiles found. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to load profiles:", error);
      }
    },

    nextProfile() {
      this.currentProfileVisible = false;
      setTimeout(() => {
        // Tăng chỉ số `profileIndex` để chuyển sang hồ sơ tiếp theo
        this.profileIndex++;

        // Tìm hồ sơ hợp lệ chưa được matched
        while (
          this.profileIndex < this.profiles.length &&
          this.matches.some(
            (match) =>
              match.targetUserId === this.profiles[this.profileIndex].userId
          )
        ) {
          this.profileIndex++;
        }

        // Kiểm tra xem chỉ số `profileIndex` có hợp lệ hay không
        if (this.profileIndex < this.profiles.length) {
          // Nếu hợp lệ, cập nhật hồ sơ hiện tại
          this.currentProfile = { ...this.profiles[this.profileIndex] };
          console.log("Profile Index updated:", this.profileIndex);
          console.log("Current Profile updated:", this.currentProfile);
        } else {
          // Nếu không còn hồ sơ nào để duyệt, kết thúc danh sách hồ sơ
          console.log("End of profile list");
          this.currentProfile = null;
          alert("You have viewed all profiles. Please try again later.");
        }

        // Hiển thị lại hồ sơ sau khi chuyển đổi
        this.currentProfileVisible = true;
      }, 500);
    },

    like() {
      // Kiểm tra xem currentProfile và userId có hợp lệ không
      if (!this.currentProfile || !this.currentProfile.userId) {
        console.error("targetUserId is missing:", this.currentProfile);
        alert("Unable to perform swipe action due to missing profile data.");
        return;
      }

      // Gọi hàm swipeAction với userId
      swipeAction(this.currentProfile.userId, true) // Thay đổi từ targetUserId thành userId
        .then((response) => {
          console.log("Swipe action completed:", response);
          this.likedProfiles.push(this.currentProfile);
          this.swipeRight = true;
          this.swipeLeft = false;
          this.showLike = true;
          setTimeout(() => {
            this.nextProfile(); // Chuyển sang hồ sơ tiếp theo thay vì changeProfile
            this.showLike = false;
          }, 500);
        })
        .catch((error) => {
          console.error("Error during swipe action:", error.message);
          alert("Có lỗi xảy ra khi thực hiện hành động like.");
        });
    },

    dislike() {
      // Kiểm tra xem currentProfile và userId có hợp lệ không
      if (!this.currentProfile || !this.currentProfile.userId) {
        console.error("targetUserId is missing:", this.currentProfile);
        alert("Unable to perform swipe action due to missing profile data.");
        return;
      }

      // Gọi hàm swipeAction với userId
      swipeAction(this.currentProfile.userId, false) // Thay đổi từ targetUserId thành userId
        .then((response) => {
          console.log("Swipe action completed:", response);
          this.dislikedProfiles.push(this.currentProfile);
          this.swipeLeft = true;
          this.swipeRight = false;
          this.showDislike = true;
          setTimeout(() => {
            this.nextProfile(); // Chuyển sang hồ sơ tiếp theo thay vì changeProfile
            this.showDislike = false;
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
    getAuthorizedImageUrl(url) {
      const token = localStorage.getItem("userToken");
      if (token) {
        const authorizedUrl = `${url}?Authorization=Bearer ${token}`;
        console.log("Authorized URL:", authorizedUrl); // Log URL để kiểm tra
        return authorizedUrl;
      } else {
        console.error("User token not found.");
        return url;
      }
    },
  },
  async mounted() {
    await this.loadProfiles(); // Gọi API khi component được mounted
    await this.loadMatches(); // Tải danh sách matches khi component được mounted
  },
};
</script>

<style scoped>
/* Main Layout */
.main-layout {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 25%;
  background-color: #f6f6f6;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  text-align: center;
  margin: 20px;
  font-size: 20px;
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
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.profile-image {
  width: 100%;
  height: auto;
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
</style>
