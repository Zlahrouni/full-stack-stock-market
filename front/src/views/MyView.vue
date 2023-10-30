<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {getStockQuote} from '@/api/finnhub';
import {Company} from '@/models/Company';
import CompanyCard from "@/components/CompanyCard.vue";

onMounted(async () => {
  companyA.value.stockQuote = await getStockQuote(companyA.value.symbol);
  companyB.value.stockQuote = await getStockQuote(companyA.value.symbol);
  companyC.value.stockQuote = await getStockQuote('B');

});

const companyA = ref(new Company('Apple', 'AAPL', new Map()));
const companyB = ref(new Company('Amazon', 'AMZN', new Map()));
const companyC = ref(new Company('Amazon', 'zzzzz', new Map()));
const companies = ref([companyA, companyB, companyC]);



const amount = ref(0);

</script>

<template>
  <main>
    <CompanyCard v-for="c in companies" :key="c.value.symbol" :company="c.value" />
  </main>
</template>

<style>

</style>