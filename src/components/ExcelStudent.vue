<template>
  <v-container>
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
      <v-col md="8" lg="4" xl="3">
        <div style="text-align: justify">
          <h1 style="text-align: justify; text-align-all: center">Déposer votre fichier </h1>
        </div>
        <br/>

          <v-alert
              border="top"
              color="primary"
              dark
          >Assurez vous de déposer uniquement un fichier excel qui respecte les normes de fichiers excel glio.
          </v-alert>
      </v-col>
    </v-row>
    <br/>
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
    <br/>
    <v-row justify="center" align="center">

      <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
      >
        <v-file-input
            prepend-icon="mdi-file-upload"

            label="fichier excel"
            ref="file"
            id="file"
            truncate-length="15"
            v-model="file"
        ></v-file-input>
      </v-col>
      <v-btn
          outlined
          color="primary darken-1"
          text
          @click="uploadFile"
      >
        Envoyer
      </v-btn>
    </v-row>
    <v-bottom-sheet v-model="bottomSheet">
      <v-sheet
          class="text-center"
          height="200px"
      >
        <v-btn
            class="mt-6"
            text
            color="red"
            @click="bottomSheet = !bottomSheet"
        >
          fermer
        </v-btn>
        <div class="py-3">
          Votre liste a été télécharger avec succès !
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ExcelStudent",
  data() {
    return {
      file: null,
      waitForEdit : false,
      bottomSheet : false
    }
  },
  methods: {
    async uploadFile() {
      const token = this.$store.state.auth.token || localStorage.getItem("token")
      let formData = new FormData()
      formData.append('file', this.file);
      const type = formData.get("file").type
      try {
        this.waitForEdit = true;
        this.dialog = false
        await axios.post(`/admin/upload-student-list`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "data-type": type,
                "x-auth-token": token,

              }
            }
        )

        this.file = ''
        this.waitForEdit = false;
        this.bottomSheet = true;


      } catch (e) {
        this.waitForEdit = false;
        alert(e)
      }
    },
  }
}
</script>

<style scoped>

</style>