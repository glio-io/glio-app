import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import store from "./store/index";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(vuetify);
Vue.use(Vuex);

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_API;
} else if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = "http://localhost:8083"
}



new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
