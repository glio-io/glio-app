<template>
  <v-container>
    <div>
      <h1 style="text-align: center">Ajouter un étudiant</h1>
    </div>
    <v-row justify="center">
      <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
      >
        <v-card ref="form">
          <v-card-text>
            <v-text-field
                v-model="myLastname"
                placeholder="Nom"
                required

                :rules="[() => !!myLastname || 'Vous devez saisir ce champ']"
                :error-messages="errorMessages"
                label="Nom"
            ></v-text-field>
            <v-text-field
                v-model="myFirstname"
                placeholder="Prénom"
                required

                :rules="[() => !!myFirstname || 'Vous devez saisir ce champ']"
                :error-messages="errorMessages"
                label="Prénom"
            ></v-text-field>
            <v-text-field
                v-model="myEmail"
                placeholder="Email"
                required
                ref="name"
                :rules="[() => !!myEmail || 'Ce champ est obligatoire']"
                :error-messages="errorMessages"
                label="E-mail"
            ></v-text-field>
            <v-autocomplete
                ref="country"
                v-model="myCampus"
                :rules="[() => !!myCampus || 'Ce champ est obligatoire']"
                :items="campuses"
                label="Campus"
                placeholder="Selectionner..."
                required
            ></v-autocomplete>          
            <v-autocomplete
                ref="country"
                v-model="myFaculty"
                :rules="[() => !!myFaculty || 'Ce champ est obligatoire']"
                :items="faculty"
                label="Spécialité"
                placeholder="Selectionner..."
                required
            ></v-autocomplete>
            <v-autocomplete
                ref="country"
                v-model="myClass"
                :rules="[() => !!myClass || 'Ce champ est obligatoire']"
                :items="classe"
                label="Classe"
                placeholder="Selectionner..."
                required
            ></v-autocomplete>
            <v-autocomplete
                ref="country"
                v-model="myPromo"
                :rules="[() => !!myPromo || 'Ce champ est obligatoire']"
                :items="year"
                label="Année"
                placeholder="Selectionner..."
                required
            ></v-autocomplete>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn @click="goBack" text>
              Annuler
            </v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                  v-if="formHasErrors"
                  left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      class="my-0"
                      v-bind="attrs"
                      @click="resetForm"
                      v-on="on"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn
                color="primary"
                text
                @click="submit"
            >
              Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="waitForEdit"
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
  props: ["dialog"],
  name: "AddStudent",
  data() {
    return {
      waitForEdit : false,
      formHasErrors: false,
      errorMessages: '',
      myEmail: "",
      myFirstname: "",
      myLastname: "",
      myPromotion: "",
      myFaculty: "",
      myClass : "",
      myCampus: '',
      myPromo : '',

    }
  },
  computed: {
    promo() {
      return this.$store.state.auth.promo?.filter(item => item !== "Tous")
    },
    faculty() {
      return this.$store.state.auth.faculty?.filter(item => item !== "Tous")
    },
    classe() {
      return this.$store.state.auth.class?.filter(item => item !== "Tous") || []
    },
    campuses() {
      return this.$store.state.auth.campuses?.filter(item => item !== "Tous") || []
    },
    year() {
      return [...Array(new Date().getFullYear() - 1990).keys()].map((e) => e + 1995)
    },
    form() {
      return {
        "School": this.$store.state.auth.school,
        "firstname": this.myFirstname,
        "lastname": this.myLastname,
        "credentials": {
          "email": this.myEmail,
          "password": ""
        },
        "Faculty": this.myFaculty,
        "Campus": this.myCampus,
        "Class" : this.myClass,
        "Promo" : this.myPromo.toString()
      }
    },
  },
  methods: {
    async goBack() {
      await this.$router.go(-1);
    },
    async submit(e) {
      e.preventDefault();
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true
          return
        }
      })
      try {
        this.waitForEdit = true
        console.log(this.form)
        await axios.post("/auth/register/student", this.form,{
          headers: {
            "x-auth-token": this.$store.state.auth.token,
            "Content-Type": "application/json"
          }
        })
        this.waitForEdit = false
        await this.$router.replace({name: "dashboard"});
      } catch (e) {
        this.waitForEdit = false
        console.log(e);
        alert(e)
      }
    }
  }
}
</script>

<style scoped>

</style>