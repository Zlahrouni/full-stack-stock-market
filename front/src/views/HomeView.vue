<script setup lang="ts">
import {ref, onMounted} from 'vue';

import type {CompanyDTO} from "@/models/companyDTO";
import {getAllCompanies} from "@/api/companyApi";
import CompanyCard from "@/components/CompanyCard.vue";

let companies = ref([] as CompanyDTO[]);
const loading = ref(true);


onMounted(async () => {
  try {
    companies.value = await getAllCompanies();
    loading.value = false;
  } catch (error) {
    console.error('Error:', error);
    loading.value = false;

  }


});





const amount = ref(0);

</script>

<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner-border" role="status"/>
    <div>Waiting for the free API to respond...</div>
  </div>
  <div class="container" v-show="!loading">
    <div class="row">
      <CompanyCard
          v-for="com in companies"
          :key="com.symbol"
          :company="com"
      />
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
  background-color: rgba(255, 255, 255, 0.7); /* Add a semi-transparent background overlay for visibility */
  z-index: 9999; /* Ensure it's above other content */
}

</style>

