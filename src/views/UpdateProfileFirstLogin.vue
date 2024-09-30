<template>
  <div class="login-page-container">
    <div class="white-container">
      <div class="form-container">
        <h2>Update Profile</h2>
        <p>Please update your profile to continue using the app</p>

        <!-- Email input field -->
        <div class="input-field">
          <label for="email">Email:</label>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            class="string-input"
            readonly
          />
        </div>

        <!-- Name input field -->
        <div class="input-field">
          <label for="username">Name:</label>
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="string-input"
          />
        </div>

        <!-- Age slider field -->
        <div class="age-slider-container">
          <label for="ageRange"
            >Age: <strong>{{ age }}</strong></label
          >
          <input
            type="range"
            v-model="age"
            min="18"
            max="100"
            class="age-slider"
            id="ageRange"
            @input="updateSliderStyle"
          />
        </div>

        <!-- Bio input field -->
        <div class="input-field">
          <label for="bio">Bio:</label>
          <textarea
            v-model="bio"
            :maxlength="bioMaxLength"
            placeholder="Bio"
            class="string-input bio-textarea"
            rows="4"
          ></textarea>
          <small class="char-counter">
            Remaining characters: {{ remainingBioChars }}
          </small>
        </div>

        <!-- Gender selection -->
        <div class="gender-selection">
          <label for="gender">Gender:</label>
          <div class="options">
            <button
              :class="{ selected: gender === 'MALE' }"
              @click="selectGender('MALE')"
            >
              MALE
            </button>
            <button
              :class="{ selected: gender === 'FEMALE' }"
              @click="selectGender('FEMALE')"
            >
              FEMALE
            </button>
            <button
              :class="{ selected: gender === 'OTHER' }"
              @click="selectGender('OTHER')"
            >
              OTHER
            </button>
          </div>
        </div>

        <!-- Error message -->
        <p v-if="profileError" class="profile-error">{{ profileError }}</p>

        <!-- Update profile button -->
        <button @click="handleChangeProfile" class="change-profile-button">
          Update Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { updateProfile } from "@/services/update-profile-service";

export default {
  data() {
    return {
      email: "", // Get email from localStorage or API
      name: "",
      age: 25, // Default value for the slider
      bio: "",
      gender: "",
      bioMaxLength: 150, // Max length for bio
      profileError: "", // Error message display
    };
  },
  methods: {
    selectGender(selectedGender) {
      this.gender = selectedGender.toUpperCase();
    },
    updateSliderStyle() {
      const slider = document.getElementById("ageRange");
      const percentage = ((this.age - 18) / (100 - 18)) * 100;
      slider.style.background = `linear-gradient(90deg, #ff4d95 ${percentage}%, #ccc ${percentage}%)`;
    },
    async handleChangeProfile() {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        this.profileError = "Email is missing. Please log in again.";
        return;
      }

      // Kiểm tra các trường bắt buộc
      if (!this.name || !this.age || !this.bio || !this.gender) {
        this.profileError = "All fields are required.";
        return;
      }

      try {
        const response = await updateProfile(
          email,
          this.name,
          this.age,
          this.bio,
          this.gender
        );
        alert(response.message);

        if (response.status === 200) {
          this.$router.push("/homePage");
        }
      } catch (error) {
        this.profileError = error.message;
      }
    },
  },
  computed: {
    remainingBioChars() {
      return this.bioMaxLength - this.bio.length;
    },
  },
  mounted() {
    this.email = localStorage.getItem("userEmail");
    this.updateSliderStyle();
  },
};
</script>
<style>

.login-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
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

.form-container h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
}

.form-container p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.string-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.profile-error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

.change-profile-button {
  width: 100%;
  padding: 15px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.change-profile-button:hover {
  background-color: #ed94b8;
}

.age-slider-container {
  width: 100%;
  margin: 10px 0;
}

.age-slider-container label {
  font-weight: bold;
}

.age-slider {
  width: 100%;
  appearance: none;
  height: 10px;
  background: #ccc;
  border-radius: 5px;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.age-slider:hover {
  opacity: 1;
}

.age-slider::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
  background: #ff4d95;
  border-radius: 50%;
  cursor: pointer;
}

.age-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #ff4d95;
  border-radius: 50%;
  cursor: pointer;
}

.gender-selection {
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}

.gender-selection .options {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button.selected {
  background-color: #727272;
  color: red;
}

button:not(.selected) {
  color: black;
}

.options button:nth-child(1) {
  background-color: #ff85a1;
}

.options button:nth-child(2) {
  background-color: #00a0f6;
}

.options button:nth-child(3) {
  background-color: #25f600;
}

button:hover {
  opacity: 0.8;
}

.bio-textarea {
  resize: vertical;
  font-size: 16px;
  line-height: 1.5;
  overflow-y: auto;
}

.char-counter {
  display: block;
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-top: -10px;
}
</style>
