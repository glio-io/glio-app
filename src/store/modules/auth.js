import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../../router";

Vue.use(Vuex);

const state = {
  loading: false,
  loggedIn: false,
  school: "",
  token: "",
  campusName : "",
  //searching query data
  campuses: null,
  faculty: null,
  promo: null,
  class : null,
  addFaculty: null,
  addPromo: null,
  ///

  user: {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    campus: "",

  },
};

const mutations = {
  getUser(state, value) {
    state.user = {
      firstname: value.Firstname,
      lastname: value.Lastname,
      email: value.Email,
      role: value.Role,
      campus: value.Campus,
    };
  },
  getClass(state, value) {
    state.class = value
  },
  getPromo(state, value) {
    state.promo = value;
  },
  getFaculty(state, value) {
    state.faculty = value;
  },
  authorized(state, value) {
    state.loggedIn = value;
  },
  loading(state, value) {
    state.loading = value;
  },
  getToken(state, value) {
    state.token = value;
  },
  getMySchool(state, value) {
    state.school = value.toLowerCase();
  },
  getMyCampus(state, value) {
    state.campusName = value;
  },
  getCampuses(state, value) {
    state.campuses = value;
  },
};

async function getSession(token) {
  try {
    return await axios.get("/admin/session", {
      headers: {
        "x-auth-token": token,
      },
    });
  } catch (e) {
    await router.push("/");
    throw new Error(e);
  }
}
function getPromoFromYearNow() {
  let tab = [...new Array(new Date().getFullYear() - 1990).keys()].map((e) => e + 2000);
  tab.unshift("Tous")
  return tab
}
/*
function calculateLevel(nb) {
  let tab = ["All"];
  for (let i = 1; i <= nb; i++) {
    tab.push("bac +" + i)
  }
  return tab
}*/

const actions = {
  async login({ commit }, user) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        "/admin/auth/login",
        {
          email: user.email,
          password: user.password,
        },
        config
      );
      const token = response.data;
      if (!token) {
        return false
      }

      localStorage.setItem("token", token);
      commit("authorized", true);
      return true
    } catch (e) {
      throw e.response?.status;
    }
  },

  async getAdminInfo({ commit }) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      commit("getToken", token);

      const response = await getSession(token);

      const user = response.data.Administration;
      commit("getUser", user)

      const campus = response.data.Campus.Secondname
      commit("getMyCampus", campus);

      const fac = response.data.Campus.Faculties;

      fac.unshift("Tous");
      commit("getFaculty", fac);

      const clss = response.data.Campus.Classes
      clss.unshift("Tous")
      commit("getClass", clss)

      commit("getPromo", getPromoFromYearNow())
      commit("getMySchool", response.data.School);

    } catch (e) {
      /*localStorage.clear();
      alert("Error from internal server");
      await router.push("/");*/
    }
  },
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
