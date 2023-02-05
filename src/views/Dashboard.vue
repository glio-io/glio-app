<template>
  <div>
    <div>
      <v-row>
        <v-col lg="8" md="6" xs="12" sm="12">
          <h1 style="font-size: 40px">
            {{ schoolName }}
          </h1>
        </v-col>
        <v-col lg="4" md="6" xs="12" sm="12">
          <Search/>
        </v-col>
      </v-row>
      <br/>
      <br/>
      <v-row justify="space-between">
        <v-col v-if="role" md="2" sm="12" xs="12">
          <v-select
              v-model="sortOptions.campusSort"
              solo-inverted
              hide-details
              :items="campuses"
              prepend-inner-icon="mdi-magnify"
              label="Ville"
          ></v-select>
        </v-col>
        <v-col md="2" sm="12" xs="12">
          <v-select
              v-model="sortOptions.speSort"
              solo-inverted
              hide-details
              :items="faculty"
              prepend-inner-icon="mdi-magnify"
              label="Spécialité"
          ></v-select>
        </v-col>
        <v-col md="2" sm="12" xs="12">
          <v-select
              v-model="sortOptions.classSort"
              solo-inverted
              hide-details
              :items="classe"
              prepend-inner-icon="mdi-magnify"
              label="Classe"
          ></v-select>
        </v-col>
        <v-col md="2" sm="12" xs="12">
          <v-select
              v-model="sortOptions.promoSort"
              solo-inverted
              hide-details
              :items="promo"
              prepend-inner-icon="mdi-magnify"
              label="Année"
          ></v-select>
        </v-col>

        <v-spacer/>
        <v-spacer/>
        <!-- <v-col>
           <v-btn
               large
               color="primary"
               dark
               outlined
           >
             <v-icon
                 left
                 dark
             >
               mdi-mail
             </v-icon>
             Rappel
           </v-btn>
         </v-col>--->
        <v-col xl="2" lg="2" md="3" sm="12" xs="12">
          <v-btn
              large
              color="primary"
              @click="navigateToAddStudent"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            étudiant
          </v-btn>

        </v-col>
      </v-row>
      <br/>
      <div>
        <DataTables v-if="studentList" v-bind:items="studentList" v-bind:loading="isLoading"
                    loading-text="Loading... Please wait"/>
      </div>
    </div>
  </div>
</template>

<script>

import DataTables from "./tables/DataTables";
import Search from "../components/Search";
import axios from "axios";


export default {
  components: {

    Search,

    DataTables
  },
  name: "Dashboard",
  computed: {
    role() {
      console.log(this.$store.state.auth.user)
      return this.$store.state.auth.user.role === "POWER_USER";

    },
    schoolName() {
      return this.$store.state.auth.campusName.charAt(0).toUpperCase() + this.$store.state.auth.campusName.slice(1)
    },
    campuses() {
      return this.$store.state.auth.campuses
    },
    promo() {
      return this.$store.state.auth.promo
    },
    studentList() {
      return this.$store.getters.studentList
    },
    faculty() {
      return this.$store.state.auth.faculty
    },
    classe() {
      return this.$store.state.auth.class
    }
  },
  watch: {
    "sortOptions": {
      handler: async function (val) {
        const isCampus = this.checkCampus(val.campusSort);
        const isFaculty = this.checkFaculty(val.speSort);
        const isPromo = this.checkPromo(val.promoSort);
        const isClass = this.checkClass(val.classSort);

        this.isLoading = true
        axios.get(`/admin/search-student?${isCampus}&${isFaculty}&${isPromo}&${isClass}`, {
          headers: {
            "x-auth-token": this.$store.state.auth.token,
          },
        })
            .then(res => {
              this.$store.commit("getStudent", res.data)
              this.isLoading = false
            })
            .catch(err => {
              if (err.response.status === 500) {
                this.$router.push("/server-error");
              }
              if (err.response.status === 401) {
                alert("Votre session à expiré")
                this.$router.push("/");
              } else {
                alert(err)
              }
            })
      },
      deep: true
    },
  },
  data() {
    return {
      students: null,
      change: null,
      sortOptions: {
        campusSort: '',
        promoSort: '',
        speSort: '',
        classSort: ''
      },
      isLoading: null
    }
  },
  methods: {
    async navigateToAddStudent() {
      await this.$router.push({name: "addStudent"});
    },
    checkClass(val) {
      if (val === "Tous") {
        return null
      }
      if (val) {
        return `cl=${encodeURIComponent(val)}`
      }
    },
    checkPromo(val) {
      if (val === "Tous") {
        return null
      }
      if (val) {
        return `p=${val}`
      }
    },
    checkFaculty(val) {
      if (val === "Tous") {
        return null
      }
      if (val) {
        return `f=${val}`
      }
    },
    checkCampus(val) {
      if (val === "Tous") {
        return null
      }
      if (val) {
        return `c=${val}`
      }
    }
  }
}
</script>

<style scoped>

</style>