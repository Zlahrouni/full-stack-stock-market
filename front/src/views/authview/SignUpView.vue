<template>
  <section class="vh-100" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <div v-if="done">
                    <div v-if="createdSuccess" class="alert alert-success" role="alert">
                      User created successfully. you can <router-link to="/login">log in</router-link> now
                    </div>
                    <div v-else>
                      <div v-for="(error, index) in errors" :key="index" class="alert alert-danger" role="alert">
                        {{ error }}
                      </div>
                    </div>
                  </div>

                  <form class="mx-1 mx-md-4">

                    <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="name" class="form-control" v-model="formData.username" />
                      <label class="form-label" for="name">Your Username</label>
                    </div>
                  </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input v-if="showPassword" type="text" id="password" class="form-control" v-model="formData.password" />
                        <input v-else type="password" id="password" class="form-control" v-model="formData.password" />

                        <label class="form-label" for="password">Password</label>

                        <div class="d-flex col gap-2">
                          <input type="checkbox" id="showPassword" v-model="showPassword" />
                          <div v-if="showPassword">Hide Password</div>
                          <div v-else>Show Password</div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input v-if="!showPassword" type="password" id="repeatPassword" class="form-control" v-model="formData.repeatPassword" />
                        <input v-else type="text" id="repeatPassword" class="form-control" v-model="formData.repeatPassword" />
                        <label class="form-label" for="repeatPassword">Repeat your password</label>
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">

                      <label class="form-text" >
                        already have an account? <RouterLink to="/login">login</RouterLink>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg" @click="register">Register</button>
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
import {addUser} from "@/api/userApi";


export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        repeatPassword: '',
      },
      passwordsDoNotMatch: false,
      createdSuccess: false,
      done : false,
      message : '',
      showPassword: false,
      errors: [],
    };
  },
  methods: {
    async register() {

      this.errors = [];

      if(this.formData.username === '' || this.formData.password === ''){
        this.errors.push("Username and password are required");
        this.done = true;
        return;
      }
      console.log("register called");
      // Check if passwords match
      if (this.formData.password !== this.formData.repeatPassword) {
        this.errors.push("Passwords do not match");
      }

      // Reset the error state
      this.passwordsDoNotMatch = false;

      console.log("errors : ", this.errors);
      // Check if username is valid

      const usernameRegex = /^[a-zA-Z0-9_]+$/;

      if (this.formData.username.length > 0 && !usernameRegex.test(this.formData.username)) {
        this.errors.push("Username can only contain letters, numbers and underscores.");
      }

      if (this.formData.username.length < 3 || this.formData.username.length > 20) {
        this.errors.push("Username must be between 3 and 20 characters.");
      }

      if (this.formData.password.length < 4 || this.formData.password.length > 40) {
        this.errors.push("Password must be between 6 and 40 characters.");
      }

      if (this.errors.length > 0) {
        this.done = true;
        console.log("errors : ", this.errors);
        return;
      }

      const user = new User(this.formData.username, this.formData.password);
      const response = await addUser(user);

      if(response.ok) {
        this.done = true;
        this.createdSuccess = true;
        this.message = response.message;
      } else {
        this.done = true;
        this.createdSuccess = false;
        this.errors.push(response.message);
      }

    },

  },
};
</script>
<style scoped>
/* Add component-specific styles if needed */
</style>
