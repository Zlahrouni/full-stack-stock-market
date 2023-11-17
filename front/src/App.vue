<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src="/st.png" height="30" width="30" class="d-inline-block align-top mr-3" alt=""> Stock Hub
          </a>
          <div class="collapse navbar-collapse justify-content-between">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active"><RouterLink to="/" class="nav-item nav-link">Home</RouterLink></li>


              <li class="nav-item"><RouterLink to="/about" class="nav-item nav-link">About</RouterLink></li>
            </ul>
            <ul class="navbar-nav ml-auto">

              <li class="nav-item"> <RouterLink to="/signup" class="nav-item nav-link"><span class="glyphicon glyphicon-user"></span> Sign Up</RouterLink></li>
              <li class="nav-item"> <RouterLink to="/login" class="nav-item nav-link"><span class="glyphicon glyphicon-user"></span> Log In</RouterLink></li>

            </ul>
          </div>
        </div>
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
