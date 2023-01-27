<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4" xl="3">
        <div justify="center" align="center">
          <img alt="logo" src="@/assets/logo.svg" style="width: 150px; height: 150px;" id="navbar-logo">
        </div>
        <br/>
        <div v-if="isValid === true">
            <v-card color="danger">
              <v-card-text>
                <strong><h3 style="text-align: center; color : red; font-size: 20px">Erreur</h3></strong>
                <br/>
                <p style="text-align: center; color : red">{{textError}}</p>
              </v-card-text>
            </v-card>
        </div>
        <br/>
        <v-form ref="form" @submit="Login">
          <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              required="true"
              filled
          ></v-text-field>
          <v-text-field
              v-model="password"
              label="Mot de passe"
              :rules="passwordRules"
              required
              filled
              type="password"
          ></v-text-field>
          <div class="text-center">
            <v-btn
                large
                block
                type="submit"
                color="primary"
                :loading="loading"
                :disabled="loading"

            >Se connecter
            </v-btn>
          </div>
        </v-form>
        <br>
        <router-link to="ResetPassword"><p justify="center" align="center">Mot de passe oublié ?</p></router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "login",
  data() {
    return {
      isValid : false,
      textError : "",
      loader: null,
      loading: false,
      email: "",
      emailRules: [
        v => !!v || 'veuillez saisir votre adresse e-mail.',
        v => /.+@.+/.test(v) || 'Vérifier le format de votre adresse e-mail.',
      ],
      password: "",
      passwordRules: [
        v => !!v || 'veuillez saisir votre mot de passe.',
      ],
    };
  },
  methods: {
    async login(e) {
      console.log("----ap")
      e.preventDefault();
      if (this.email == 0 || this.password == 0) {
        return
      } else {
        this.loading = !this.loading

        try {
          await this.$store.dispatch('login', {email : this.email, password : this.password})
          await this.$router.replace({name: "dashboard"});
          setTimeout(() => (this.loading = false), 3000)
        } catch (e) {
          this.loading = false
          if (e !== 401) {
            this.isValid = true
            this.textError = "Veuillez réessayer dans quelques instants"
            this.loader = null
          } else {
            this.textError = "L'identifiant ou le mot de passe saisi n'est pas valide"
            this.isValid = true
            this.loader = null
            this.$store.commit("authorized", false);
            localStorage.clear()
          }
        }
      }
    }
  }
};
</script>