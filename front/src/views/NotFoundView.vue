<!-- components/NotFound.vue -->

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center mt-5">
        <h1 class="display-4">404 Not Found</h1>
        <p class="lead">Sorry, the page you are looking for might be in another universe.</p>
        <router-link to="/" class="btn btn-primary">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>

</style>
