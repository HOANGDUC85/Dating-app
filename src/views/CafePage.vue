<template>
    <div class="container">
      <!-- Sidebar -->
      <LoveBellSidebar />
  
      <!-- Phần chi tiết cafe -->
      <div class="cafe-details">
        <!-- Phần hình ảnh và thông tin quán cafe -->
        <div class="main-cafe">
          <img :src="mainImage" alt="Oasis Cafe" class="main-image" />
          <div class="cafe-info">
            <h1>{{ cafe.name }}</h1>
            <p class="price">Price: {{ cafe.price }}</p>
            <p class="address">{{ cafe.address }}</p>
            <button class="view-button">View more</button>
          </div>
        </div>
  
        <!-- Phần địa điểm liên quan -->
        <div class="related-places">
          <h2>Related places</h2>
          <div class="places-grid">
            <div v-for="place in relatedPlaces" :key="place.id" class="place-card">
              <img :src="place.image" :alt="place.name" class="place-image" />
              <div class="place-info">
                <h3>{{ place.name }}</h3>
                <p>{{ place.address }}</p>
                <p class="price">{{ place.price }}</p>
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
      LoveBellSidebar,
    },
    data() {
      return {
        mainImage: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max', // Thay bằng đường dẫn tới hình ảnh chính
        cafe: {
          name: 'Oasis Cafe',
          price: 'From 30.000 - 80.000 VND',
          address: '101 Nguyen Dinh Chieu Street, District 3, HCMC',
        },
        relatedPlaces: [
          {
            id: 1,
            name: 'Lagom Cafe',
            address: '19 Ho Van Hue, Phu Nhuan District',
            price: '45.000 - 90.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max', // Thay bằng đường dẫn tới hình ảnh liên quan
          },
          {
            id: 2,
            name: 'Blanc. Restaurant Saigon',
            address: '180D Hai Ba Trung, District 1',
            price: '130.000 - 600.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max',
          },
          {
            id: 3,
            name: 'The Running Bean',
            address: '115 Ho Tung Mau, District 1',
            price: '50.000 - 120.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max',
          },
          {
            id: 4,
            name: 'Soul Ben Thanh Restaurant & Bar',
            address: '7 Thu Khoa Huan, District 1',
            price: '150.000 - 300.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max',
          },
          {
            id: 5,
            name: 'HOME Vietnamese Restaurant',
            address: '216/4 Dien Bien Phu, District 3',
            price: '75.000 - 400.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max',
          },
          {
            id: 6,
            name: "S'mores Saigon",
            address: '1A Phan Ton, District 1',
            price: '25.000 - 100.000 VND',
            image: ' https://ik.imagekit.io/tvlk/blog/2022/10/quan-cafe-yen-tinh-quan-1-1.jpg?tr=c-at_max?tr=c-at_max',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Container chứa cả sidebar và phần chính */
  .container {
    display: flex;
    align-items: flex-start;
  }
  
  /* Sidebar chiếm 20% chiều rộng */
  .sidebar {
    flex: 1;
    max-width: 20%;
  }
  
  /* Phần chính chiếm 80% chiều rộng */
  .cafe-details {
    flex: 4;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .main-cafe {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .main-image {
    width: 300px;
    height: auto;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .cafe-info {
    max-width: 500px;
  }
  
  .cafe-info h1 {
    font-size: 28px;
    color: #ff33cc;
  }
  
  .price {
    color: #333;
    font-size: 18px;
    margin: 10px 0;
  }
  
  .address {
    font-size: 16px;
    color: #555;
  }
  
  .view-button {
    background-color: #ff33cc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .view-button:hover {
    background-color: #ff66ff;
  }
  
  .related-places {
    margin-top: 50px;
  }
  
  .related-places h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ff33cc;
  }
  
  .places-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .place-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
  }
  
  .place-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .place-info {
    padding: 10px;
  }
  
  .place-info h3 {
    font-size: 20px;
    color: #333;
  }
  
  .place-info p {
    font-size: 16px;
    color: #555;
  }
  
  .place-info .price {
    color: #ff33cc;
    font-size: 18px;
    margin-top: 10px;
  }
  </style>
  