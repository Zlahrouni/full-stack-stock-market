<script>
import {getAllCompanies} from "@/api/companyApi";
import CompanyCard from "@/components/CompanyCard.vue";



export default {
  name: 'HomeView',
  components: {
    CompanyCard
  },

  beforeRouteEnter(to, from, next) {
    // Set the title dynamically based on route information
    document.title = `Stock Hub - Home`;
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // Set the title dynamically when the route is updated
    document.title = `Stock Hub - Home`;
    next();
  },
  data() {
    return {
      companies : [],
      loading : true,
    }
  },
  async mounted() {
    try {
      const apiResponse = await getAllCompanies();
      if(apiResponse.ok) {
        if(apiResponse.data !== undefined) {
          this.companies = apiResponse.data;
        }
      }
      this.loading = false;
    } catch (error) {
      console.error('Error:', error);
      this.loading = false;

    }
  }
}


</script>

<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner-border" role="status"/>
    <div>Waiting for the free API to respond...</div>
  </div>
  <div class="container" v-show="!this.loading">
    <div v-if="this.companies.length > 0" class="row">
      <CompanyCard
          v-for="com in this.companies"
          :key="com.symbol"
          :company="com"
          :isFav="com.favorite"
      />
    </div>
    <div v-else>
      <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <div class="d-flex row ">
          <div class="alert alert-info">Unexpected Error - No company found :( </div>
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
  z-index: 9999; /* Ensure it's above other content */
}

</style>

