<template>
  <div class="container">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Phần chi tiết cafe -->
    <div class="cafe-details">
      <!-- Phần địa điểm liên quan -->
      <div class="related-places">
        <h2>RELATED DATING PLACE</h2>
        <div class="places-grid">
          <div v-for="place in paginatedPlaces" :key="place.id" class="place-card">
            <img :src="place.image" :alt="place.name" class="place-image" />
            <div class="place-info">
              <h3>{{ place.name }}</h3>
              <p>{{ place.address }}</p>
              <p class="price">{{ place.price }}</p>
              <button class="view-button" @click="viewDetails(place)">View Details</button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>

    <!-- Modal Popup for cafe details -->
    <div v-if="selectedPlace" class="modal-overlay">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>{{ selectedPlace.name }}</h2>
        <img :src="selectedPlace.image" :alt="selectedPlace.name" class="modal-image" />
        <p><strong>Address:</strong> {{ selectedPlace.address }}</p>
        <p><strong>Price Range:</strong> {{ selectedPlace.price }}</p>
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
      cafesPerPage: 4,  // Số lượng quán cafe trên mỗi trang
      currentPage: 1,   // Trang hiện tại
      selectedPlace: null,  // Quán cafe được chọn để hiển thị chi tiết
      relatedPlaces: [
        {
          id: 1,
          name: 'Lagom Cafe',
          address: '19 Ho Van Hue, Phu Nhuan District',
          price: '45.000 - 90.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
        {
          id: 2,
          name: 'Blanc. Restaurant Saigon',
          address: '180D Hai Ba Trung, District 1',
          price: '130.000 - 600.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
        {
          id: 3,
          name: 'The Running Bean',
          address: '115 Ho Tung Mau, District 1',
          price: '50.000 - 120.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
        {
          id: 4,
          name: 'Soul Ben Thanh Restaurant',
          address: '7 Thu Khoa Huan, District 1',
          price: '150.000 - 300.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
        {
          id: 5,
          name: 'HOME Vietnamese Restaurant',
          address: '216/4 Dien Bien Phu, District 3',
          price: '75.000 - 400.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
        {
          id: 6,
          name: "S'mores Saigon",
          address: '1A Phan Ton, District 1',
          price: '25.000 - 100.000 VND',
          image: 'https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max',
        },
      ],
    };
  },
  computed: {
    // Tổng số trang
    totalPages() {
      return Math.ceil(this.relatedPlaces.length / this.cafesPerPage);
    },

    // Các quán cafe trên trang hiện tại
    paginatedPlaces() {
      const start = (this.currentPage - 1) * this.cafesPerPage;
      const end = start + this.cafesPerPage;
      return this.relatedPlaces.slice(start, end);
    },
  },
  methods: {
    viewDetails(place) {
      this.selectedPlace = place;  // Gán quán cafe được chọn vào `selectedPlace`
    },

    // Chuyển đến trang trước
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    // Chuyển đến trang tiếp theo
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    // Đóng modal
    closeModal() {
      this.selectedPlace = null;
    },
  },
};
</script>

<style scoped>
/* Container chứa cả sidebar và phần chính */
.container {
  display: flex;
  align-items: flex-start;
  background-color: #f5f5f5;
}

/* Phần chính chiếm 80% chiều rộng */
.cafe-details {
  flex: 4;
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.related-places {
  margin-top: 50px;
}

.related-places h2 {
  font-size: 32px;
  margin-top: -50px;
  margin-bottom: 50px;
  color: #ff33cc;
  text-align: center;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.place-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  width: 100%;
  height: 450px;
}

.place-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.place-image {
  width: 500px;
  height: 200px;
  object-fit: cover;
}

.place-info {
  padding: 10px;
}

.place-info h3 {
  font-size: 22px;
  color: #333;
}

.place-info p {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
}

.place-info .price {
  color: #ff33cc;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.view-button {
  background-color: #ff33cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #ff66ff;
}

/* Pagination */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  background-color: #ff33cc;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #ff66ff;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  font-size: 18px;
  color: #333;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
}

.modal-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
