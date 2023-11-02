<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {getStockQuote} from '@/api/finnhub';
import {Company} from '@/models/Company';
import CompanyCard from "@/components/CompanyCard.vue";
import type {StockQuoteResponse} from "@/models/StockQuoteResponse.vue";


const defaultStockQuote: StockQuoteResponse = {
  c: 0, // Close price
  pc: 0, // Previous close price
  h: 0,  // High price
  l: 0,  // Low price
  o: 0,  // Open price
  t: 0,  // Timestamp
};

const companyA = new Company('Apple', 'AAPL', defaultStockQuote);
const companyB = new Company('Amazon', 'AMZN', defaultStockQuote);
const companyC = new Company('Paypal', 'PYPL', defaultStockQuote);
const companyD = new Company('Tesla', 'TSLA', defaultStockQuote);

const loading = ref(true);

onMounted(async () => {
  await Promise.all([
    companyA.stockQuote = await getStockQuote(companyA.symbol),
    companyB.stockQuote = await getStockQuote(companyB.symbol),
    companyC.stockQuote = await getStockQuote(companyC.symbol),
    companyD.stockQuote = await getStockQuote(companyD.symbol),

  ]);

  loading.value = false;
});

const companies = ref([companyA, companyB, companyC, companyD]);


const amount = ref(0);

</script>

<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div class="col" v-else v-for="com in companies">
        <CompanyCard
            :key="com.symbol"
            :company="com"
            v-if="com.stockQuote.c > 0"
        />
    </div>
  </main>
</template>

<style>

</style>