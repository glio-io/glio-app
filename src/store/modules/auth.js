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
    _schoolId: "",
  },
};

const mutations = {
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
  getSchool(state, value) {
    state.school = value.toLowerCase();
  },
  getCampuses(state, value) {
    state.campuses = value;
  },
  getUserInfo(state, value) {
    state.user = {
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      role: value.role,
      campus: value.campus,
      _schoolId: value._schoolId,
    };
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
    throw new Error(e);
  }
}


async function RedirectToLogin() {
  await router.push("/");
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
      const response = await getSession(token);
      console.log(response)
      commit("getPromo", getPromoFromYearNow())
      //get faculty
      //const fac = faculty.data.faculties;
      //const clss = faculty.data.class


      //add All
     /* fac.unshift("Tous");
      clss.unshift("Tous")

      //Commit
      commit("getClass", clss)
      commit("getFaculty", fac);*/
     /* commit("getPromo", getPromoFromYearNow())
      if (response.status === 200) {
        commit("getToken", token);
        commit("getUserInfo", {
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.credentials.email,
          role: response.data.role,
          campus: response.data.campuses.toString(),
          _schoolId: response.data._schoolId,
        });
        commit("getSchool", response.data.school);
        //
      } else {
        localStorage.clear();
        alert("Votre session à expiré");
        await RedirectToLogin();
      }*/
    } catch (e) {
      localStorage.clear();
      alert("Error from internal server");
      await RedirectToLogin();
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
