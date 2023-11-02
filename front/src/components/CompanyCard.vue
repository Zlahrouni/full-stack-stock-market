<script>

import {CompanyDTO} from "@/models/companyDTO";

export default {
  props: {
    company: CompanyDTO,
  },
  computed: {
    priceChange() {
      return this.company.stockQuote.c - this.company.stockQuote.pc;
    },
  },
};



</script>

<template>
  <div class="card w-25">
    <div class="card-body">
      <h3>{{ company.name }}</h3>
      <p>({{ company.symbol }})</p>
      <p>Stock Price: {{ company.stockQuote.c }} $</p>
      <span :class="{ 'text-success': priceChange > 0, 'text-danger': priceChange < 0 }">
        <i :class="{ 'bi bi-arrow-up': priceChange > 0, 'bi bi-arrow-down': priceChange < 0 }"></i>
      </span>
    </div>
  </div>
</template>



<style scoped>

</style>
