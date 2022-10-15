<template>
    <div>
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-12">
              <!-- Display user detail decoded -->
              <ul class="list-group">
                <li class="list-group-item">Name : {{ user.name }}</li>
                <li class="list-group-item">Email : {{ user.email }}</li>
              </ul>

              <!-- Logout button -->
              <button @click="logUserOut"> Logout</button>
            </div>
          </div>
        </div>
    </div>
  </template>
  <script>
  import swal from "sweetalert";

  export default {
    data() {
      return {
        user: {}
      };
    },
    methods: {

      //Get user detail by decoding the JWT stored in local storage
      async getUserDetails() {
        try{
          let response = await this.$http.get("/me",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          });
          this.user = response.data;
        }
        catch (error) {
          if (error.status == 401) {
            swal("Error", error.data.message, "error");
          } else {
            swal("Error", error.data.err.message, "error");
          }
        }
      },
      //Clear the user JWT and redirect to login page
      logUserOut() {
        localStorage.removeItem("jwt");
        this.$router.push("/");
      }
    },
    //After created, run getUserDetails() to get user detail
    created() {
      this.getUserDetails();
    }
  };
  </script>
