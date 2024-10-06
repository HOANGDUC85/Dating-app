
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <HomePage :userId="2" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/homePage"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
