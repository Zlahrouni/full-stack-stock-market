<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue';
import {getStockQuote} from '@/api/finnhub';
import {Company} from '@/models/Company';
import CompanyCard from '@/components/CompanyCard.vue';


const companyA = new Company('Apple', 'AAPL', new Map());
const companyB = new Company('Amazon', 'AMZN', new Map());
const companyC =new Company('zzzzzz', 'zzzzz', new Map());

const loading = ref(true);

onMounted(async () => {
  await Promise.all([
    companyA.stockQuote = await getStockQuote(companyA.symbol),
    companyB.stockQuote = await getStockQuote(companyB.symbol),
    companyC.stockQuote = await getStockQuote('B'),
  ]);

  loading.value = false;
});

const companies = ref([companyA, companyB, companyC]);


const amount = ref(0);

</script>

<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div class="row" v-else>
      <CompanyCard
          v-for="c in companies"
          :key="c.symbol"
          :company="c"
      />
    </div>
  </main>
</template>

<style>
.company-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adjust column width as needed */
  gap: 20px; /* Adjust the gap between items as needed */
}
</style>