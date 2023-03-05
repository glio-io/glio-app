<template>
  <div>
    <v-card>
      <v-card-text>
        <div style="margin-top: 20px">
          <v-row justify="center">
            <v-col
                sm="12" lg="4" md="4"
            >
              <h1 style="margin-bottom: 20px">Informations</h1>
              <h2>{{ school }}</h2>
            </v-col>
            <v-col lg="2">
              <div style="margin-left: 10%">
                <v-btn :color="wantsToEdit ? 'none' : 'primary'" @click="uploadProfil">
                  <v-icon left>
                    {{ wantsToEdit ? "mdi-pencil" : "mdi-content-save" }}
                  </v-icon>
                  {{ wantsToEdit ? 'Modifier le profil' : 'Enregistrer' }}

                </v-btn>
              </div>
            </v-col>
          </v-row>
          <br/>
          <br/>
          <br/>
          <v-row justify="center">
            <v-col sm="12" lg="3" md="4" xs="12" s="12">
              <v-text-field
                  v-model="lastname"
                  label="Nom"
                  :filled="wantsToEdit"
                  :readonly="wantsToEdit"
              ></v-text-field>
              <v-text-field
                  v-model="email"
                  label="Email"
                  :filled="wantsToEdit"
                  :readonly="wantsToEdit"
              ></v-text-field>

            </v-col>
            <v-col sm="12" lg="3" md="4" xs="12" s="12">
              <v-text-field
                  v-model="firstname"
                  label="Prénom"
                  :filled="wantsToEdit"
                  :readonly="wantsToEdit"
              ></v-text-field>
              <v-text-field
                  v-model="role"
                  label="Rôle"
                  :readonly=true
              ></v-text-field>
              <v-selects
                  v-model="role"
                  :items="items"
                  :filled="wantsToEdit"
                  label="Rôle"
                  :readonly="wantsToEdit"
              ></v-selects>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

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
          <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Account",
  data() {
    return {
      wantsToEdit: true,
      items: ['admin', 'super'],
      myEmail: "",
      myFirstname: "",
      myLastname: "",
      myRole: "",
      waitForEdit: false
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.auth.user.email;
      },
      set(val) {
        this.myEmail = val || this.email;
      }
    },
    firstname: {
      get() {
        return this.$store.state.auth.user.firstname;
      },
      set(val) {
        console.log(val)
        this.myFirstname = val;
      }
    },
    lastname: {
      get() {
        return this.$store.state.auth.user.lastname;
      },
      set(val) {
        return this.myLastname = val
      }
    },
    role: {
      get() {
        return this.$store.state.auth.user.role;
      },
      set(val) {
        return this.myRole = val;
      }
    },
    school() {
      return this.$store.state.auth.school.charAt(0).toUpperCase() + this.$store.state.auth.school.slice(1)
    },
    campus() {
      return this.$store.state.auth.user.campus;
    }
  },
  methods: {
    async uploadProfil() {
      this.wantsToEdit = !this.wantsToEdit;
      if (this.wantsToEdit) {
        this.waitForEdit = true
        try {
          const data = {
            email: this.myEmail || this.email,
            lastname: this.myLastname || this.lastname,
            firstname: this.myFirstname || this.firstname,
            role: this.myRole || this.role,
          }
          await axios.post("/admin/management/informations",data, {
            headers: {
              "x-auth-token": this.$store.state.auth.token,
              "content-type" : "application/json"
            }
          })

        } catch (e) {
          console.log(e);
          alert(e);
        }
        this.waitForEdit = false
      }
    }
  }
}
</script>

<style scoped>

</style>