<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4">
        <h1 v-show="!validLogin" style="font-bold" justify="center" align="center">Mot de passe oublié</h1>
        <h1 v-show="validLogin" style="font-bold" justify="center" align="center">Réinitialisation de votre mot de passe réussi</h1>
        <p v-show="loginError" class="text-center font-bold text-red-500 py-1">{{ loginError }}</p>
        <br>
		<p v-show="!validLogin">Un email contenant un lien de réinitialisation va vous être envoyé.</p>
        <p v-show="validLogin" justify="center" align="center">Un email contenant un lien de réinitialisation vous a été envoyé.</p>
        <v-form ref="form" @submit="ResetPassword" >
        <v-text-field v-show="!validLogin"
            v-model="email"
            label="Email"
            :rules="emailRules"
            required="true"
            filled
        ></v-text-field>
        <div class="text-center">
          <v-btn v-show="!validLogin"
              large
              block
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="loading"

          >Envoyer
          </v-btn>
        </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const emailRe = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export default {
  name: "ResetPassword",
  data() {
    return {
      text: `Désolé, notre script s'est crashé, comme c'est dommage !`,
      loader : null,
      loading : false,
      email: "",
      loginError: '',
      validLogin: false,
      emailRules: [
        v => !!v || 'veuillez saisir votre adresse e-mail.',
        v => /.+@.+/.test(v) || 'Vérifier le format de votre adresse e-mail.',
      ],
    };
  },
  methods: {
   async ResetPassword(e) {
      e.preventDefault();
      if (this.email == 0 || !emailRe.test(this.email)) {
        this.loginError = "Veuillez vérifier l'adresse e-mail saisi";
        return
      } else {
        this.loading = !this.loading

        setTimeout(() => (this.loading = false), 3000)
        this.loader = null

        //verifier si le retour est 200 ou 500
        this.validLogin = true;
        this.loginError="";
        try {
          await axios.post(`auth/forgot-password/admin`, {
            email : this.email
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
        } catch (e) {
          console.log(e)
        }

      }
    }
  }
};
</script>