<template>
  <div class="layout">
    <LoveBellSidebar />
    <div class="content">
      <div id="app">
        <div class="container">
          <div class="matches-section">
            <h2>Matches</h2>
            <div class="matches">
              <div
                v-for="(match, index) in matches"
                :key="index"
                class="match-card"
              >
                <img :src="match.image" alt="profile image" class="profile-image" />
                <h3>{{ match.name }} <span>{{ match.age }}</span></h3>
                <p>{{ match.info }}</p>
              </div>
            </div>
          </div>

          <div class="user-section">
            <div class="match-card">
              <img :src="currentProfile.image" alt="profile image" class="profile-image" />
              <h3>{{ currentProfile.name }} <span>{{ currentProfile.age }}</span></h3>
              <p>{{ currentProfile.info }}</p>
            </div>
            <div class="action-buttons">
              <button @click="dislike">Dislike</button>
              <button @click="like">Like</button>
              <button @click="superLike">Super Like</button>
            </div>
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
    LoveBellSidebar
  },
  data() {
    return {
      currentProfile: {
        name: 'Thanh Thảo',
        age: 19,
        info: 'Cô ấy thích mèo và nghe nhạc.',
        image: 'https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp',
      },
      matches: [
        {
          name: 'Rann',
          age: 22,
          info: 'Thích đi du lịch và khám phá.',
          image: 'https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp',
        },
        {
          name: 'Kylie',
          age: 20,
          info: 'Fan của phim hoạt hình.',
          image: 'https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp',
        },
        {
          name: 'Kylie',
          age: 20,
          info: 'Fan của phim hoạt hình.',
          image: 'https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp',
        },
        
      ],
    };
  },
  methods: {
    dislike() {
      console.log('Dislike clicked');
    },
    like() {
      console.log('Like clicked');
    },
    superLike() {
      console.log('Super Like clicked');
    },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.matches-section {
  width: 35%;
  margin-right: 20px;
  margin-top: -70px;
}

.matches {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}

.user-section {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-section .match-card{
  width: 600px;
  height: 7 00px;
  margin-top: -60px;
}
.user-section .match-card img{
  width: 550px;
  height: 750px;
}
h2 {
  text-align: left;
  margin-bottom: 20px;
}

.match-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
}

.profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 50%;
}

button {
  padding: 10px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 20px;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bbb;
}

button:active {
  transform: scale(0.95);
}
</style>
