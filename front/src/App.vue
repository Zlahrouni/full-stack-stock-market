<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="app">
    <header>
      <nav class="d-flex justify-content-center cet navbar navbar-expand-lg navbar-light bg-light gap-5">
        <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-item nav-link">About</RouterLink>
      </nav>
    </header>
    <RouterView />
    <footer class="fixed-bottom text-center ">
      <div>© <a href="https://ziadlahrouni.com" target="_blank"> ZIAD LAHROUNI</a>  2023 - ALL RIGHTS RESERVED</div>
    </footer>
  </div>
</template>

<style scoped>

</style>
