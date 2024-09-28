<template>
    <div class="lovebell-sidebar">
  <ul class="menu">
    <li class="menu-item-title">
      <span>LOVE-BELL</span>
    </li>
    
    <!-- Link to Home -->
    <li class="menu-item">
      <router-link to="/homePage" class="menu-link">
        <i class="material-icons">home</i>
        <span>Home</span>
      </router-link>
    </li>

    <!-- Link to Search -->
    <li class="menu-item">
      <router-link to="/mapPage" class="menu-link">
        <i class="material-icons">map</i>
        <span>Mapping</span>
      </router-link>
    </li>

    <!-- Link to Criteria -->
    <li class="menu-item">
      <router-link to="/criteriaPage" class="menu-link">
        <i class="material-icons">filter</i>
        <span>Criteria</span>
      </router-link>
    </li>

    <!-- Link to Notifications -->
    <li class="menu-item">
      <router-link to="/notifications" class="menu-link">
        <i class="material-icons">notifications</i>
        <span>Thông báo</span>
      </router-link>
    </li>

    <!-- Link to Messages -->
    <li class="menu-item">
      <router-link to="/chattingPage" class="menu-link">
        <i class="material-icons">chat</i>
        <span>Message</span>
      </router-link>
    </li>

    <!-- Link to Dating Place -->
    <li class="menu-item">
      <router-link to="/cafePage" class="menu-link">
        <i class="material-icons">coffee</i>
        <span>Dating Place</span>
      </router-link>
    </li>

    <!-- Link to Safety -->
    <li class="menu-item">
      <router-link to="/youAreSafePage" class="menu-link">
        <i class="material-icons">warning</i>
        <span>You Are Safe</span>
      </router-link>
    </li>

    <!-- Profile Link -->
    <li class="menu-item profile">
      <router-link to="/profile" class="menu-link">
        <img :src="require('@/assets/logo.png')" alt="Profile Image" class="profile-img"/>
        <span>Trang cá nhân</span>
      </router-link>
    </li>

    <!-- Link to More Options -->
    <li class="menu-item">
      <router-link to="/more" class="menu-link">
        <i class="material-icons">menu</i>
        <span>Xem thêm</span>
      </router-link>
    </li>
  </ul>
</div>

  </template>
  
  <script>
  export default {
    name: 'LoveBellSidebar',
  };
  </script>
  
  <style scoped>
  template{
    padding: 0;
    margin: 0;
  }
  .lovebell-sidebar {
    background-color: #ff85a1;
    height: auto;
    width: 300px;
    color: #000;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    flex-grow: 1;
  }
  .menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
router-link {
  text-decoration: none;
}
.menu-item {
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center; /* Căn giữa theo chiều dọc cho icon và chữ */
    cursor: pointer;
    color: #000;
}

.menu-item i {
    font-size: 27px; /* Điều chỉnh kích thước của icon */
    margin-right: 15px; /* Khoảng cách giữa icon và chữ */
    color: #000;
}

.menu-item span {
    font-size: 20px; /* Điều chỉnh kích thước chữ */
    color: #000;
    text-decoration: none;
}

.menu-link {
    display: flex; 
    align-items: center; /* Đảm bảo cả icon và text được căn ngang */
    text-decoration: none;
    color: inherit;
}

  
  .menu-item-title {
    padding: 35px;
    margin-left: 30px;
    font-size: 30px;
    font-family: 'Billabong', cursive; /* The Instagram logo font */
  }
  
  .profile-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .profile {
    margin-top: 260px;
  }
  
  .material-icons {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .menu-item:last-child {
    margin-bottom: 20px;
  }
  </style>
  