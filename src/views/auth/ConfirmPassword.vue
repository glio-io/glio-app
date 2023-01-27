<template>
  <div>
    <v-container v-if="show" fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="3">
          <div style="margin-top: 80%">
            <h2 style="text-align: center">Réinitialisation de votre mot de passe</h2>
            <br/>
          </div>
          <br/>
          <v-form ref="form" @submit="confirmPassword">
            <v-text-field
                v-model="password"
                label="Mot de passe"
                required="true"
                filled
                type="password"
                :rules="passwordRules"
            ></v-text-field>
            <v-text-field
                v-model="checkpassword"
                label="Confirmer le mot de passe"
                required
                filled
                type="password"
                :rules="passwordRules"
            ></v-text-field>
            <div class="text-center">
              <v-btn
                  large
                  block
                  type="submit"
                  color="primary"
                  :loading="loading"
                  :disabled="loading"
              >Confirmer
              </v-btn>
            </div>
          </v-form>
          <br>
        </v-col>
        <v-snackbar
            v-model="snackbar"
            :color="color"
            tile
            absolute
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              fermer
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-container>
    <div v-if="show === false" justify="center" align="center">
      <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>
  </div>

</template>
<script>
import axios from "axios";

export default {
  name: "ConfirmPassword",
  data() {
    return {
      color: "",
      text: "",
      snackbar: false,
      show: false,
      loading: false,
      password: '',
      checkpassword: '',
      passwordRules: [
        v => !!v || 'veuillez saisir votre mot de passe.',
      ],
    }
  },
  async mounted() {
    if (this.$route.query.token && this.$route.query.id) {
      try {
        await axios.get(`auth/check-token/admin?token=${this.$route.query.token}&id=${this.$route.query.id}`)
        this.show = true
      } catch (e) {
        await this.$router.push('/expired-link')
      }
    } else {
      await this.$router.push('/')
    }
  },
  methods: {
    async confirmPassword(e) {
      e.preventDefault()
      if (this.password === this.checkpassword) {
        const data = {
          password: this.password,
          userid: this.$route.query.id,
          token: this.$route.query.token
        }
        try {
          let config = {
            headers: { "Content-Type": "application/json" },
          };
          await axios.post("/auth/confirm-forgot-password/admin", data, config)
          this.color = "sucess"
          this.text = "Votre mot de passe à bien été modifié"
          this.snackbar = true
          setTimeout(async function () {
            await this.$router.push('/')
          }.bind(this), 2000)
        } catch (e) {
          this.password = ""
          this.checkpassword = ""
          alert("Erreur du server")
        }
      } else {
        this.color = "red accent-2"
        this.text = "Les mots de passe saisie ne sont pas identiques"
        this.snackbar = true
      }
    }
  }

}
</script>

<style scoped>

</style>