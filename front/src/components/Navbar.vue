<script>
import {mapActions, mapGetters} from "vuex";
import {deleteUser, logoutUser} from "@/api/userApi";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

export default {
  name: "Navbar",
  data() {
    return {
      islogged: false

    };
  },
  computed: {
    ...mapGetters(['isLogged', 'getUsername']),
  },
  methods: {
    ...mapActions(['getLogged']),
    logout() {
      console.log("logout")
      logoutUser().then((loggedOut) => {
        if(loggedOut) {
          toast("Logged out successfully", {
            autoClose: 3000,
            type: "success",
            position: "bottom-right"

          });
        } else {
          toast("Error logging out", {
            autoClose: 3000,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    },
    deleteAccount() {
      console.log("delete account")
      deleteUser().then((deleted) => {
        if(deleted) {
          toast("Account deleted successfully", {
            autoClose: 3000,
            type: "success",
            position: "bottom-right"
          });
        } else {
          toast("Error deleting account", {
            autoClose: 3000,
            type: "error",
            position: "bottom-right"
          });
        }
      });
    }
  },
  async mounted() {
    await this.getLogged();
    console.log(this.isLogged)
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand nav-link"><img src="/st.png" height="30" width="30" class="d-inline-block align-top mr-3" alt=""> Stock Hub</RouterLink>

      <!-- Add the navbar-toggler button for smaller devices -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active"><RouterLink to="/" class="nav-item nav-link">Home</RouterLink></li>
          <li class="nav-item"><RouterLink to="/about" class="nav-item nav-link">About</RouterLink></li>
        </ul>

        <div v-if="isLogged">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ getUsername}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link :to="`/favorites`" class="dropdown-item">My favorite</router-link>
                <div class="dropdown-item" @click="logout" href="#">Log out</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item delete-account" @click="deleteAccount" href="#">Delete Account</div>
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"> <RouterLink to="/signup" class="nav-item nav-link"><span class="glyphicon glyphicon-user"></span> Sign Up</RouterLink></li>
            <li class="nav-item"> <RouterLink to="/login" class="nav-item nav-link"><span class="glyphicon glyphicon-user"></span> Log In</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.delete-account {
  color: red;
}
</style>