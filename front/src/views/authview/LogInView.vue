<template>
  <section class="vh-100" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                  <form class="mx-1 mx-md-4">
                    <div v-if="filled === false">
                      <div class="alert alert-danger" role="alert">
                        Please fill all the fields.
                      </div>
                    </div>

                    <div v-if="done">
                      <div v-if="loginSuccess" class="alert alert-success" role="alert">
                        {{ message }}
                      </div>
                      <div v-else class="alert alert-danger" role="alert">
                        {{ message }}
                      </div>
                      <!-- Add the following div for the redirect message -->
                      <div v-if="loginSuccess" class="alert alert-info" role="alert">
                        Redirecting to home screen...
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="username" class="form-control" v-model="formData.username"  required/>
                        <label class="form-label" for="username">Username</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="password" class="form-control" v-model="formData.password" required/>
                        <label class="form-label" for="password">Password</label>
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <label class="form-text">
                        Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg" @click="login">Login</button>
                    </div>

                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                       class="img-fluid" alt="Sample image">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {User} from "@/models/user";
import {loginUser} from "@/api/userApi";

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      filled: true,
      done : false,
      loginSuccess : false,
      message : '',
    };
  },
  methods: {
    async login() {
      // Handle login logic using this.formData
      if ((this.formData.username === '') || (this.formData.password === '')) {
        this.filled = false;
      } else {
        this.filled = true;
        const user = new User(this.formData.username, this.formData.password);

        const apiResponse = await loginUser(user);

        if (apiResponse.ok) {
          this.done = true;
          this.message = 'Login successful';
          this.loginSuccess = true;
          setTimeout(() => {
            this.$router.push('/');
          }, 3000);
        } else {
          this.done = true;
          this.loginSuccess = false;
          this.message = apiResponse.message;
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles if needed */
</style>
