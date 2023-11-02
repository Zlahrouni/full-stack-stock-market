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


    console.log("ses")
  } catch (error) {
    console.error('Error:', error);
    loading.value = false;

  }
});





const amount = ref(0);

</script>

<template>
  <div v-if="loading">Loading...</div>
  <div class="container">
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
.card:hover {
  background-color: #e0e0e0; /* Change the background color when hovering */
}
</style>

