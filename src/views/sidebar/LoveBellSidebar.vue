<template>
    <div class="lovebell-sidebar">
      <ul class="menu">
        <li class="menu-item-title">
          <span>LOVE-BELL</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">home</i>
          <span>Home</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">search</i>
          <span>Search</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">filter</i>
          <span>Criteria</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">notifications</i>
          <span>Thông báo</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">chat</i>
          <span>Message</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">coffee</i>
          <span>Dating Place</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">warning</i>
          <span>You Are Safe</span>
        </li>
        
        <li class="menu-item profile">
          
          <img :src="require('@/assets/logo.png')" alt="Profile Image" class="profile-img"/>
          <span>Trang cá nhân</span>
        </li>
        <li class="menu-item">
          <i class="material-icons">menu</i>
          <span>Xem thêm</span>
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
  
  .menu-item {
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #000;
  }
  
  .menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .menu-item i {
    font-size: 30px;
    margin-right: 15px;
  }
  
  .menu-item span {
    font-size: 18px;
  }
  
  .menu-item-title {
    padding: 40px;
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
  