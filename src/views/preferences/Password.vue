<template>
  <v-card>
    <v-card-text>
      <div style="margin-top: 20px">
        <v-row justify="center">
          <v-col
              sm="12" lg="9" md="4"
          >
            <h1 style="margin-bottom: 20px">Modifier le mot de passe</h1>
            <br/>
            <v-text-field
                v-model="password"
                :rules="[rules.required]"
                name="input-10-1"
                label="Ancien mot de passe"
                counter
                :type="show ? 'text' : 'password'"

            ></v-text-field>

            <v-text-field
                v-model="newPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Nouveau mot de passe"

                counter
                @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
                v-model="confirmNewPassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.match]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirmer le nouveau mot de pase"

                counter
                @click:append="show2 = !show2"
            ></v-text-field>


            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn text @click="resetForm">
                Annuler
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                  color="primary"
                  text
                  @click="submitPassword"
                  :loading="isLoad"
                  :disabled="isLoad"
              >
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">
              Mot de passe
            </v-card-title>

            <v-card-text>
              Votre mot de passe a bien été modifié
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                J'ai compris
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
            v-model="errordialog"
            max-width="290"
        >
          <v-card>
            <v-toolbar
                color="red"
                dark
            >Erreur
            </v-toolbar>
            <br/>
            <v-card-text>
              <h3> Votre mot de passe est incorrecte</h3>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="errordialog = false"
              >
                J'ai compris
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Password",
  data() {
    return {
      errordialog: false,
      dialog: false,
      isLoad: false,
      show: false,
      show1: false,
      show2: false,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      rules: {
        required: value => !!value || '*.',
        min: v => v.length >= 8 || 'minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère spécial et 1 chiffre ',
        match: v => v === this.newPassword || 'les mots de passe ne correspondent pas',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
  methods: {
    resetForm() {
      this.password = ""
      this.newPassword = ""
      this.confirmNewPassword = ""
    },
    async submitPassword() {
      if (this.confirmNewPassword !== this.newPassword) {
        return
      }
      this.isLoad = true
      try {
        const data = {
          password: this.password.trim(),
          newpassword: this.newPassword.trim()
        }
        console.log(this.$store.state.auth.token)
        const response = await axios.put("/admin/management/password", data, {
          headers: {
            "content-type": "application/json",
            "x-auth-token": this.$store.state.auth.token,
          },
        })
        if (response.status === 202) {
          this.isLoad = false
          this.dialog = true
          this.password = null
          this.newPassword = null
          this.confirmNewPassword = null
        }
      } catch (e) {
        this.errordialog = true
        this.isLoad = false
        console.log(e);

      }


    }
  }
}
</script>

<style scoped>

</style>