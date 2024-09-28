<template>
  <div class="app-wrapper">
    <!-- Sidebar component -->
    <LoveBellSidebar />

    <!-- Main content area (Radar and information) -->
    <div class="main-content">
      <!-- Page Title (same row as sidebar) -->
      <div class="page-title">
        <h2>LOVE BELL RADAR</h2>
      </div>
      <div class="content">
        <div class="radar-section">
          <div class="radar">
            <!-- Radar scanning line (always show when scanning) -->
            <div v-if="isScanning" class="scan-line"></div>

            <!-- Users displayed on the radar (show after the first round of scanning) -->
            <div v-if="showUsers">
              <div
                class="user"
                v-for="user in users"
                :key="user.id"
                :style="getUserPosition(user)"
                @click="showProfile(user)"
              ></div>
            </div>

            <!-- Center dot (your position) -->
            <div class="center-dot"></div>
          </div>
        </div>

        <!-- Information and button section -->
        <div class="info-section">
          <div class="info">
            <h3>Looking for someone?</h3>
            <p>{{ users.length }} users are close to you, let's find them !!</p>
            <p>Within {{ range }}m</p>
            <p>
              Make sure to look and check, then decide whether you should catch
              up with them!
            </p>
          </div>
          <button
            class="scan-btn"
            @click="startScanning"
            :disabled="isScanning"
          >
            {{ isScanning ? "Scanning..." : "Re-scanning" }}
          </button>

          <!-- Profile Popup (conditional rendering) -->
          <div v-if="selectedUser" class="profile-popup">
            <h4>User Profile</h4>
            <p><strong>ID:</strong> {{ selectedUser.id }}</p>
            <p><strong>Distance:</strong> {{ getRandomDistance() }}m</p>
            <button @click="closeProfile">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



  
  <script>
  import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
  
  export default {
    components: {
      LoveBellSidebar,
    },
    data() {
      return {
        range: 500, // Distance range
        users: [], // Store user positions
        isScanning: false, // Controls scanning animation
        showUsers: false, // Controls when to show the users
        selectedUser: null, // Stores the user clicked for profile display
      };
    },
    mounted() {
      this.randomizeUsers(); // Initialize random user positions when the app loads
    },
    methods: {
      getUserPosition(user) {
        // Convert user position to percentage of radar area
        const left = user.x * 100 + "%";
        const top = user.y * 100 + "%";
        return { left, top };
      },
      randomizeUsers() {
        // Create random user positions (x, y between 0 and 1)
        this.users = Array.from({ length: 6 }, () => ({
          id: Math.random().toString(36).substring(7), // Generate random ID
          x: Math.random(), // Random x position (0 to 1)
          y: Math.random(), // Random y position (0 to 1),
        }));
      },
      startScanning() {
        // Start scanning, enable the animation
        this.isScanning = true;
        this.showUsers = false; // Hide users initially
        this.selectedUser = null; // Hide any active profile
  
        // Randomize user positions
        this.randomizeUsers();
  
        // After 4 seconds (1 round of 4s animation), show users
        setTimeout(() => {
          this.showUsers = true; // Show users after 1 round
        }, 4000); // 1 round of scanning
  
        // After 8 seconds (2 rounds of 4s animation each), stop scanning
        setTimeout(() => {
          this.isScanning = false;
        }, 8000); // 2 rounds (4 seconds each round)
      },
      showProfile(user) {
        // Set the selected user to display their profile
        this.selectedUser = user;
      },
      closeProfile() {
        // Close the profile popup
        this.selectedUser = null;
      },
      getRandomDistance() {
        // Returns a random distance for user profile (for demo purposes)
        return Math.floor(Math.random() * 500) + 1;
      },
    },
  };
  </script>
  
  <style scoped>
/* Wrapper for the whole app */
.app-wrapper {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
}

/* Main content area */
.main-content {
  display: flex;
  flex-direction: column; /* Bố trí theo cột cho tiêu đề và phần radar/info */
  flex: 1;
  padding-left: 20px; /* Thụt vào ngang với sidebar */
}

/* Page Title (aligned with sidebar) */
.page-title {
  display: flex;
  align-items: center;
  padding: 20px 0;
  width: 50%; /* Nằm ngang với phần còn lại của nội dung */
}

.page-title h2 {
  font-size: 35px;
  color: #ff33cc;
  margin: 35px;
  
}

hr{
  border: none; /* Loại bỏ viền mặc định */
  height: 2px; /* Độ dày của hr */
  background-color: #ff66ff; /* Màu sắc */
  margin: 20px 0; /* Khoảng cách trên và dưới */}

/* Content area below the title */
.content {
  display: flex;
  flex: 1;
  padding-top: 120px;
}

/* Radar section */
.radar-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.radar {
  position: relative;
  width: 400px; /* Điều chỉnh kích thước radar */
  height: 400px; /* Điều chỉnh kích thước radar */
  border-radius: 50%;
  background-color: #d7f7f0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 0; /* Đảm bảo không có margin-top */
}


/* Center dot */
.center-dot {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff99ff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* User dot on radar */
.user {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #ffb6c1;
  cursor: pointer;
  transition: all 0.5s ease;
}

/* Radar scanning effect */
.scan-line {
  position: absolute;
  width: 50%;
  height: 4px;
  background-color: rgba(255, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
  animation: rotate-scan 4s linear infinite;
}

@keyframes rotate-scan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Information section and button */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info {
  font-size: 21px;
}

.info h3{
  font-weight: bold;
  font-size: 35px;
}

.scan-btn {
  width: 30%;
  padding: 10px 20px;
  font-size: 20px;
  background-color: #ff99ff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.scan-btn:disabled {
  background-color: #ddd;
}

.scan-btn:hover:not(:disabled) {
  background-color: #ff66ff;
}

/* Profile popup */
.profile-popup {
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
}

.profile-popup button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ff99ff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.profile-popup button:hover {
  background-color: #ff66ff;
}

</style>
  