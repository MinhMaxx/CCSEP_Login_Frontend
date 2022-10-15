import swal from "sweetalert";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//Routes
//Each path use corresponding component
const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  }
];


//Router setup
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//Check for authentication JWT token before routing if the route "requiresAuth"
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      swal("Error", "Unauthorized access! Please login and try again!", "error");
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;