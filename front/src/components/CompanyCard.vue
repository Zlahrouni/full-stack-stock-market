<script>
import {Company} from "@/models/Company";

export default {
  props: {
    company: Company,
  },
};
</script>

<template>
  <div class="card">
    <h3>{{ company.name }}</h3>
    <p>Symbol: {{ company.symbol }}</p>
    <p>Stock Price: {{ company.stockQuote.get("c") }}</p>
    </div>
</template>


<style scoped>
/* Add your card styling here */
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
