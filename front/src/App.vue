<script setup lang="ts">
import {RouterView } from 'vue-router'
import {checkToken} from "@/api/userApi";
import {onMounted, ref} from "vue";
import Navbar from "@/components/Navbar.vue";
import store from "@/store";


const isAuthenticated = ref(false);
const username = ref('');

onMounted(async () => {
  const token = store.getters.getToken;
  if (token) {
    const apiResponse = await checkToken(token);
    if (apiResponse.ok) {
      isAuthenticated.value = true;
      username.value = apiResponse.data ?? '';
      console.log("username", username.value);
    }
  }
});

//https://www.youtube.com/watch?v=P3PW-PbG-ns
</script>

<template>
  <div>
    <header>
      <Navbar></Navbar>
    </header>

    <RouterView />


    <footer class="fixed-bottom text-center ">
      <div>© <a href="https://ziadlahrouni.com" target="_blank"> ZIAD LAHROUNI</a>  2023 - ALL RIGHTS RESERVED</div>
    </footer>
  </div>
</template>

<style scoped>

</style>
