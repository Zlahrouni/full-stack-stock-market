<script>
import {Company} from "@/models/Company";

export default {
  props: {
    company: Company,
  },
};



</script>

<template>
  <div class="card w-25">
    <div class="card-body">
      <h3>{{ company.name }} </h3> <p>({{ company.symbol }})</p>
      <p>Stock Price: {{ company.stockQuote.c }}</p>
    </div>

  </div>

</template>


<style scoped>

</style>
