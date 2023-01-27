<template>
  <v-row >
    <v-col class="align-center">

      <v-toolbar
          flat
          color="primary"
          dark
      >
        <v-toolbar-title>Mail</v-toolbar-title>
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
        <v-tab>
          <v-icon left>
            mdi-account-group
          </v-icon>
          Equipe
        </v-tab>


      </v-tabs>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Mail"
}
</script>

<style scoped>

</style>