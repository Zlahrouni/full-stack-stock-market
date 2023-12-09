<script>
import { CompanyDTO } from "@/models/companyDTO";
import {mapGetters} from "vuex";

export default {
  props: {
    company: CompanyDTO,
  },
  data() {
    return {
      imageExists: true, // Default to true, assuming the image exists
    };
  },
  async created() {
    if (this.company.website) {
      try {
        this.imageExists = await this.checkImageExists(
            `https://logo.clearbit.com/${this.company.website}`
        );
      } catch (error) {
        console.error("Error checking image existence:", error);
      }
    }
  },
  methods: {
    async checkImageExists(url) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
      } catch (error) {
        return false;
      }
    },
  },
  computed: {
    ...mapGetters(['isLogged']),
    priceChange() {
      return this.company.stockQuote.c - this.company.stockQuote.pc;
    },
  },
};
</script>

<template>
  <div class="card w-25">
    <router-link :to="`/company/${company.symbol}`">
    <div class="card-body" >

      <div class="card-title">
        <h3>
          <span :class="{ 'text-success': priceChange > 0, 'text-danger': priceChange < 0 }">
        <i :class="{ 'bi bi-arrow-up-right': priceChange > 0, 'bi bi-arrow-down-right': priceChange < 0 }"></i>
      </span>
          {{ company.name }}
        </h3>
        <img
          v-if="company.website && imageExists"
          :src="`https://logo.clearbit.com/${company.website}`"
          alt="{{company.name}} Logo"
        />

      </div>
      <p>({{ company.symbol }})</p>
      <p>Stock Price: {{ company.stockQuote.c }} $</p>

      <a v-if="isLogged" href="#" class="btn btn-success">Add to favorite</a>
    </div>
    </router-link>
  </div>
</template>

<style scoped>
img {
  display: block;
  max-width: 10%;
  height: auto;
}

a {
  text-decoration: none;
  color: black;
  transition: 0.4s;
}
</style>
