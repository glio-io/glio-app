import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  adminList: null,
  studentList: null,
  page: 1,
};

const mutations = {
  getStudent(state, value) {
    state.studentList = value;
  },
  getPage(state, value) {
    state.page = value;
  },
};

const actions = {
  async getStudentList({ commit }) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await axios.get("/admin/students", {
        headers: {
          "x-auth-token": token,
        },
      });
      commit("getStudent", response.data);
    } catch (e) {
      console.log(e);
      throw e.response?.status;
    }
  },

  async GetAdminList() {
    const token = localStorage.getItem("token");
    console.log("---", token);
    try {
      let config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.get("admin/management/admins", config);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e.response?.status;
    }
  },
};

const getters = {
  studentList(state) {
    return state.studentList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
