<template>
  <v-container fill-height>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4" xl="3">
        <h1>Un problème avec Glio ?</h1>
      </v-col>
    </v-row>
    <v-row v-show="final === true" justify="center" align="center">
      <v-col cols="12" md="6" lg="4" xl="6">
        <v-form ref="form" @submit="sendIssues">
          <v-textarea
              solo
              v-model="issue"
              label="Dites-nous tout"
          ></v-textarea>

          <v-btn
              type="submit"
          >
            Envoyer
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-if="final === false"  justify="center" align="center">
      <v-col  >
        <h1 style="text-align: center">Merci, votre message a bien été envoyé ! </h1>
      </v-col>
    </v-row>
    <v-dialog
        v-model="waitForSending"
        hide-overlay
        persistent
        width="300"
    >
      <v-card
          color="primary"
          dark
      >
        <v-card-text>
          Patientez...
          <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Support",
  data() {
    return {
      waitForSending : false,
      issue : '',
      final : true,
    }
  },
  methods : {
    async sendIssues(e) {
      e.preventDefault();
      this.waitForSending = true;
      try {
        const data =  {
          email :  this.$store.state.auth.user.email,
          issue : this.issue,
          school : this.$store.state.auth.school,
          campus :this.$store.state.auth.user.campus,
        }
        await axios.post(`/admin/support`, data, {
          headers: {
            "x-auth-token": this.$store.state.auth.token || localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        this.waitForSending = false;
        this.final = false
      } catch (e) {
        alert(e);
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>