<script>

import CompanyCard from "@/components/CompanyCard.vue";
import {toast} from "vue3-toastify";
import {getFavorites} from "@/api/favoriteApi";
import {mapGetters} from "vuex";



export default {
  name: "FavoriteView",
  components: {CompanyCard},
  beforeRouteEnter(to, from, next) {
    // Set the title dynamically based on route information
    document.title = `Stock Hub - My Favorites`;
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // Set the title dynamically when the route is updated
    document.title = `Stock Hub - My Favorites`;
    next();
  },
  data() {
    return {
      companies: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['isLogged', 'getUsername']),
  },
  async mounted() {
    try {
      const apiResponse = await getFavorites();
      if(apiResponse.ok) {

        toast(apiResponse.data?.length + ' favorites found', {type: "info", position: "bottom-right"});
        this.companies = apiResponse.data ?? [];
      } else {
        toast(apiResponse.message ?? 'Error getting favorites', {type: "error", position: "bottom-right"})
      }
      //companies.value = await getAllCompanies();
      this.loading = false;
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;

    }
  },
};

</script>

<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner-border" role="status"/>
    <div>Waiting for the free API to respond...</div>
  </div>
  <div class="container" v-show="!loading">
    <div v-if="this.companies.length > 0">
      <div class="row">
        <CompanyCard
            v-for="com in companies"
            :key="com.symbol"
            :company="com"
            :isFav="com.favorite"
        />
      </div>
    </div>
    <div v-else>
      <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <div class="d-flex row ">
          <div class="alert alert-info">No companies found in your favorites list.</div>
          <router-link to="/" class="btn btn-success">Add Companies to favorite</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}
</style>