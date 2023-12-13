<script>
import { CompanyDTO } from "@/models/companyDTO";
import {mapGetters} from "vuex";
import {toast} from "vue3-toastify";
import {addOrRemoveFavorite} from "@/api/favoriteApi";

export default {
  props: {
    company: CompanyDTO,
    isFav: Boolean,
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
    async favoriteaction() {
      const apiResponse = await addOrRemoveFavorite(this.company.symbol, this.company.favorite);
      if (apiResponse.ok) {
        console.log("message for api", apiResponse.message)
        toast(apiResponse.message, {type: "success"});
        this.company.favorite = !this.company.favorite;

      } else {
        console.log("error for api", apiResponse.message)
        toast("Error: " + apiResponse.message, {type: "error"});
      }
    }
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
      <div class="d-flex row gap-3">
        <router-link class="btn btn-info" :to="`/company/${company.symbol}`">More details</router-link>

        <div v-if="isLogged">
          <div @click="favoriteaction" :class="{'btn btn-danger w-100': company.favorite, 'btn btn-success w-100': !company.favorite}">
            {{company.favorite ? "Remove from favorite" : "Add to favorite"}}
          </div>
        </div>
      </div>


    </div>
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
