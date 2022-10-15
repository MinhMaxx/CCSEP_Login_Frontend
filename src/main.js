import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

//App setup
//Creating instance of axios call to server
const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");