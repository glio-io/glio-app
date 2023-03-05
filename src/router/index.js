import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

import Login from "../views/auth/login.vue";
import ResetPassword from "../views/auth/ResetPassword";
import MainLayout from "../container/MainLayout";
//import Dashboard from "../views/Dashboard";
import Parameters from "../views/preferences/Parameters";
import Support from "../views/support/Support";
import Student from "../views/students/Student";
import Confirm from "../views/auth/Confirm";
import PageNotFound from "../views/error/PageNotFound";
import Mail from "../views/mails/Mail";
import axios from "axios";
import AddStudent from "../components/AddStudent";
import ExcelStudent from "../components/ExcelStudent.vue";
import ServerError from "../views/error/ServerError";
import ConfirmPassword from "../views/auth/ConfirmPassword";
import ExpiredLink from "../views/auth/ExpiredLink";

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: PageNotFound,
  },
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    async beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token && to.path === "/login") {
        try {
          await axios.get("/admin/session", {
            headers: {
              "x-auth-token": token,
            },
          });
        } catch (e) {
          console.log(e);
          next();
        }
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/ConfirmPassword",
    name: "ConfirmPassword",
    component: ConfirmPassword,
  },
  {
    path: "/expired-link",
    name : "expiredLink",
    component: ExpiredLink
  },
  {
    path: "/confirm",
    name: "confirm",
    component: Confirm,
  },
  {
    path: "/",
    name: "",
    component: MainLayout,
    async beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token && to.path !== "/login") {
        try {
          await axios.get("/admin/session", {
            headers: {
              "x-auth-token": token,
            },
          });
        } catch (e) {
          localStorage.clear();
          next("/login");
        }
        next();
      } else {
        localStorage.clear();
        next("/login");
      }
    },
    children: [
      {
        path: "/server-error",
        name: "server-error",
        component: ServerError,
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: lazyLoad("Dashboard"),
      },
      {
        path: "add_student",
        name : "addStudent",
        component : AddStudent
      },
      {
        path: "excel_student",
        name : "excelStudent",
        component : ExcelStudent
      },
      {
        path: "mail",
        name: "mail",
        component: Mail,
      },
      {
        path: "parametres",
        name: "parametres",
        component: Parameters,
      },
      {
        path: "support",
        name: "support",
        component: Support,
      },
      {
        path: "student/:id",
        name: "student",
        component: Student,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;