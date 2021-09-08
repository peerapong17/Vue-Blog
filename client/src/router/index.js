import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import CreateBlog from "../views/CreateBlog.vue";
import BlogDetail from "../views/BlogDetail.vue";
import UserBlog from "../views/UserBlog.vue";
import EditBlog from "../views/EditBlog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/create-blog",
    name: "Create-Blog",
    component: CreateBlog,
  },
  {
    path: "/blog-detail/:blog_id",
    name: "Blog-Detail",
    component: BlogDetail,
  },
  {
    path: "/user-blog",
    name: "User-Blog",
    component: UserBlog,
  },
  {
    path: "/edit-blog/:blog_id",
    name: "Edit-Blog",
    component: EditBlog,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
