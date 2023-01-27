<template>
  <div>
    <v-app>
      <v-navigation-drawer
          v-model="drawer"
          class="grey lighten-4"
          :mini-variant.sync="mini"
          permanent
          app
      >
        <v-list-item>
          <v-btn
              icon
              @click.stop="mini = !mini"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item
                v-for="[icon, text, link] in links"
                :key="icon"
                link
                :to="link"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-if="mini === false" v-slot:append>
          <div class="pa-2">
            <v-btn @click="logout" color="error" block>
              Se deconnecter
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-container fluid>
        <div v-show="loading === false">
          <router-view :key="$route.path"></router-view>
        </div>
        <div v-show="loading === true" class="center-screen">
          <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
          ></v-progress-circular>
        </div>
      </v-container>
    </v-app>
  </div>
</template>
<script>

export default {
  name: "MainLayout",
  data() {
    return {
      selectedItem: 0,
      drawer: false,
      links: [
        ['mdi-inbox-arrow-down', 'Tableau de bord', `/dashboard`],
        ['mdi-cog', 'Paramètres', '/parametres'],
        ['mdi-information', 'Support', '/support'],
      ],
      mini: false,
    }
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading
    },
  },
  async mounted() {
    try {
      this.$store.commit("loading", true)
      await this.$store.dispatch("getStudentList")
      await this.$store.dispatch("getAdminInfo")
      await this.$store.dispatch("getCampuses")
      this.$store.commit("loading", false)
    } catch(e) {
      console.log(e)
    }
  },
  methods: {
    logout() {
      this.$store.commit("authorized", false);
      localStorage.clear()
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>