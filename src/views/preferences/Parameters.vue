<template>
  <v-row >
    <v-col class="align-center">

        <v-toolbar
            flat
            color="primary"
            dark
        >
          <v-toolbar-title>Paramètres</v-toolbar-title>
        </v-toolbar>
        <v-tabs >
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Compte
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            Mot de passe
          </v-tab>
          <v-tab v-if="role === 'super'">
            <v-icon left>
              mdi-account-group
            </v-icon>
           Equipe
          </v-tab>

          <v-tab-item>
           <Account/>
          </v-tab-item>
          <v-tab-item>
          <Password/>
          </v-tab-item>
          <v-tab-item>
           <Teams/>
          </v-tab-item>
        </v-tabs>

    </v-col>
  </v-row>
</template>

<script>
import Account from "./Account";
import Password from "./Password";
import Teams from "./Teams";
export default {
  name: "Preferences",
  components: {Teams, Password, Account},
  computed: {
    role () {
      return this.$store.state.auth.user.role;
    }
  }
}
</script>

<style scoped>

</style>