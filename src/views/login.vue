<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <!-- Login form -->
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <!-- Email input with email format checking -->
          <!-- v-model binded the input field with login.email-->
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
            required
          />
          <!-- Password input -->
          <!-- v-model binded the input field with login.password-->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />
          <!-- Redirecting route to register -->
          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>

            <!-- Login in button -->
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    //Send a HTTP POST login request to server and with for result
    async loginUser() {
      try {
        let response = await this.$http.post("/login", this.login);
        let token = response.data.token;
        if (token) {
          //Stored token if login if successful
          localStorage.setItem("jwt", token);
          swal("Success", "Login Successful", "success");
          //Redirecting route to home page 
          this.$router.push("/home");
        }
      } catch (error) {
        //Send out an swal popup if login unsuccessful
        if (error.status == 401) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>