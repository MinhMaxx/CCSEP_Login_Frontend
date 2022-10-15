<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <!-- Register form -->
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <!-- Name input -->
          <!-- v-model binded the input field with login.name-->
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model="register.name"
            required
          />

          <!-- Email input with email format checking -->
          <!-- v-model binded the input field with login.email-->
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="register.email"
            required
          />

          <!-- Password input -->
          <!-- v-model binded the input field with login.password-->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="register.password"
          />
          <!-- Redirecting route to login -->
          <p>
            Already have an account??<router-link to="/"
              >click here</router-link
            >
              <!-- Register button -->
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Sign Up
              </button>
          </p>
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
      register: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    //Send a HTTP POST register request to server and with for result
    async registerUser() {
      try {
        let response = await this.$http.post("/register", this.register);
        let token = response.data.token;
        if (token) {
          //Stored token if login if successful
          localStorage.setItem("jwt", token);
          swal("Success", "Registration Successfully!", "success");
          //Redirecting route to home page if successful
          this.$router.push("/home");
        } else {
          //Send out an swal popup if unsuccessful
          swal("Error", "Registration Failed!", "error");
        }
      } catch (err) {
        //Send out an swal popup if email have been used
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>