<template>
  <v-container v-if="show === true" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="3">
        <div>
          <h1 style="text-align: center">Bonjour {{ firstname }}</h1>
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
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

export default {
  name: "Confirm",
  data() {
    return {
      userId: '',
      firstname: '',
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
    try {
      const res = await axios.get(`auth/validate/admin?token=${this.$route.query.token}`)
      if (res.data.FirstName && res.data.ID) {
        this.show = true
        this.userId = res.data.ID
        this.firstname = res.data.FirstName
      }
    } catch (e) {
      await this.$router.push('/')
    }
  },
  methods: {
    async confirmPassword(e) {
      e.preventDefault()
      if (this.password === this.checkpassword) {
        const data = {
          password: this.password,
          id: this.userId
        }
        console.log(data)
        try {
          const res = jsonwebtoken.sign(data, process.env.VUE_APP_SECRET, {expiresIn: '1h'});
          await axios.post(`/auth/register/admin/confirm?token=${res}`, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          await this.$router.push('/')
        } catch (e) {
          console.log(e)
          alert(e)
        }
      } else {
        alert("Mot de passe invalide")
      }
    }
  }
}
</script>

<style scoped>

</style>