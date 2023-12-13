<script>
import { getCompanyBySymbol } from "@/api/companyApi";
import {addOrRemoveFavorite} from "@/api/favoriteApi";
import {toast} from "vue3-toastify";
import {mapGetters} from "vuex";

export default {
  name: 'CompanyView',
  data() {
    return {
      symbol: null,
      apiResponse : null,
      company: null,
    };
  },
  async mounted() {
    // Access the symbol parameter from the route
    this.symbol = this.$route.params.symbol;
    try {
      // Perform asynchronous operation (e.g., fetching data)
      this.apiResponse = await getCompanyBySymbol(this.symbol.toUpperCase());
      if(this.apiResponse.ok === true) {
        this.company = this.apiResponse.data;
        console.log('13122023 - Successfully fetched company data:', this.apiResponse.data);
        console.log('13122023 - is it favorite?', this.company.favorite);
      } else {
        console.error('Error fetching company data:', this.apiResponse.message);
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  },
  methods: {
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
  <div class="container mt-4">
    <div v-if="this.apiResponse != null">
      <div v-if="this.apiResponse?.data != null">
        <h1 class="mb-4">Company Details</h1>

        <!-- Display company data or handle loading/error states as needed -->
        <div>
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Company Name: {{ company.name }}</h5>
              <p class="card-text">Symbol: {{ company.symbol }}</p>

              <div v-if="isLogged">
                <div @click="favoriteaction" :class="{'btn btn-danger w-100': company.favorite, 'btn btn-success w-100': !company.favorite}">
                  {{company.favorite ? "Remove from favorite" : "Add to favorite"}}
                </div>
              </div>
            </div>
          </div>


          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Company Logo</h5>
              <img
                  :src="`https://logo.clearbit.com/${company.website}`"
                  alt="{{company.name}} Logo"
                  class="img-fluid"
              />
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Stock Information</h5>
              <p class="card-text">Stock Price: ${{ company.stockQuote.c }}</p>
              <p class="card-text">Stock High: ${{ company.stockQuote.h }}</p>
              <p class="card-text">Stock Low: ${{ company.stockQuote.l }}</p>
              <p class="card-text">Stock Open: ${{ company.stockQuote.o }}</p>
              <p class="card-text">Previous Close: ${{ company.stockQuote.pc }}</p>
              <p class="card-text">Stock Volume: {{ company.stockQuote.t }}</p>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Company Website</h5>
              <a :href="company.website" target="_blank" class="card-link">{{ company.website }}</a>
            </div>
          </div>
        </div>

      </div>
      <div v-else>{{this.apiResponse.message}}</div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>



<style scoped>
a {
  text-decoration: none;
  color: black;
  transition: 0.4s;
}
</style>
