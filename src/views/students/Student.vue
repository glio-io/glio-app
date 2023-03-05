<template>
  <div>
    <div v-if="isLoad === false">
      <v-container fluid>
        <v-card outlined>
          <v-app-bar
              flat
              color="primary"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              Informations sur l'étudiant
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                color="white"
                icon
                @click="updateStudent"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text>
            <v-row>
              <v-col sm="10" lg="10" xl="10" md="10" v-if="wantsToEdit === false">
                <v-list color="transparent">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-account
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.Student.Lastname }} {{
                          information.Student.Firstname
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-email
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.Student.Email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-phone
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.Student.Phone }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ information.CampusName }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-school
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.Student.Faculty }}, {{
                          information.Student.Promotion
                        }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ information.Student.Class }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-note
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Notes :
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ information.Student.Notes }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col v-if="wantsToEdit === true">
                <br/>
                <v-row>
                  <v-col sm="12" lg="3" md="4" xs="12">
                    <v-text-field
                        v-model="editInfo.Lastname"
                        label="Nom"
                        outlined
                        required="true"
                        :rules="dataRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="editInfo.Firstname"
                        label="Prénom"
                        outlined
                        :rules="dataRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="editInfo.Email"
                        label="Email"
                        outlined
                        :rules="dataRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="editInfo.Phone"
                        label="Tel"
                        outlined
                        :rules="dataRules"
                    ></v-text-field>
                    <v-select
                        v-model="editInfo.Faculty"
                        :items="faculty"
                        outlined
                        label="Spécialité"
                        :rules="dataRules"
                    ></v-select>
                    <v-select
                        v-model="editInfo.Class"
                        :items="classe"
                        outlined
                        label="Classe"
                        :rules="dataRules"
                    ></v-select>
                    <v-select
                        v-model="editInfo.Promotion"
                        :items="promo"
                        outlined
                        label="Promotion"
                        :rules="dataRules"
                    ></v-select>
                    <v-textarea
                        v-model="editInfo.Notes"
                        label="Note"
                        counter
                        maxlength="300"
                        full-width
                        single-line
                        outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="my-2">
                      <v-btn
                          outlined
                          color="error"
                          dark
                          large
                          @click="openDeleteStudent"
                      >
                        Supprimer l'étudiant
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <br/>

        <div class="text-right">

          <v-btn
              style="margin-right: 10px"
              v-if="information.active === false"
              outlined
              color="primary"
              dark
              @click=" sendInvitation"
          >
            {{ invitSent ? "Invitation envoyée..." : "Renvoyez une invitation" }}
          </v-btn>
          <template>
            <v-dialog
                v-model="dialog"
                persistent
                width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  document
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Ajouter un fichier</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          sm="12"
                      >
                        <v-file-input
                            accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,image/jpg"
                            label="fichier"
                            ref="file"
                            id="file"
                            v-model="file"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*Indiquer un nom au fichier</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red darken-1"
                      text
                      @click="dialog = false"
                  >
                    Fermer
                  </v-btn>
                  <v-btn
                      color="primary darken-1"
                      text
                      @click="uploadFile"
                  >
                    Envoyer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <v-row v-if="urlArray.length === 0">
            <v-col>
              <p style="text-align: center; margin-top: 100px">Aucun document disponible</p>
            </v-col>
          </v-row>
          <div v-if="urlArray.length > 0">
            <v-list>
              <template v-for="(file) in urlArray">
                <v-list-item
                    :key="file.Name"

                >
                  <v-list-item-avatar>
                    <v-icon
                        class="grey lighten-1"
                        dark
                    > mdi-file
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-action-text>
                      <v-list-item-title style="text-align: left">{{ file.Name }}</v-list-item-title>
                    </v-list-item-action-text>
                    <v-list-item-subtitle style="text-align: left">{{ file.Date }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                        fab
                        icon
                        small
                        @click="visualizer(file)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                        fab
                        icon
                        small
                        @click="downloadImage(file)"
                    >
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                        fab
                        icon
                        small
                        @click="fillNewName(file)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                        fab
                        icon
                        small
                        @click="deleteObject(file)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                    :key="`divider-${file.Name}`"
                ></v-divider>
              </template>
            </v-list>
          </div>
          <v-dialog
              v-model="deleteModal"
              persistent
              width="500"
          >
            <v-card>
              <v-card-title class="text-h5 red--text">
                Attention
              </v-card-title>
              <v-card-text>Voulez-vous supprimer ce document ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="darken-1"
                    text
                    @click="deleteModal = false"
                >
                  Non
                </v-btn>
                <v-btn
                    color="error darken-1"
                    text
                    @click="deleteItemConfirm"
                >
                  Oui
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
              v-model="viewImage"
              persistent
              width="1280"
          >
            <v-card v-if="viewImage">
              <v-toolbar
                  dark
                  color="primary"
              >
                <v-btn
                    icon
                    dark
                    @click="viewImage = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <div v-if="viewItem.Key.split('.').pop() !== 'pdf'">
                <v-img
                    contain
                    :src="viewItem.Url"
                    :lazy-src="viewItem.Url"
                    aspect-ratio="1"
                    class="grey lighten-2"
                >
                </v-img>
              </div>
              <div v-else>
                <pdf :src="viewItem.Url"></pdf>
              </div>
            </v-card>
          </v-dialog>


        </div>
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
        <v-dialog v-model="deleteStudentModal" width="500"
        >
          <v-card>
            <v-card-title class="text-h5 red--text">
              Attention
            </v-card-title>
            <v-card-text>Voulez-vous supprimer cet étudiant ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="darken-1"
                  text
                  @click="deleteStudentModal = false"
              >
                Non
              </v-btn>
              <v-btn
                  color="error darken-1"
                  text
                  @click="deleteStudentConfirm"
              >
                Oui
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="fileName.editFile" width="500">
          <v-card>
            <v-card-title>
              <span class="text-h5">Modifier le nom du fichier</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      sm="12"
                  >
                    <v-text-field
                        v-model="fileName.newName"
                        :hint="fileName.newName"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Indiquer un nom au fichier</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="fileName.editFile = false"
              >
                Fermer
              </v-btn>
              <v-btn
                  color="primary darken-1"
                  text
                  @click="editNameFile"
              >
                Modifier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
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
          Attention, ce nom de fichier est déjà utilisé. Veuillez réessayer.
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <div v-if="isLoad === true" justify="center" align="center">
      <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>
    <br/>
    <br/>
  </div>
</template>

<script>
import axios from "axios";
//import pdf from 'vue-pdf'

export default {
  components: {
    //pdf
  },
  name: "Students",
  data() {
    return {
      bottomSheet : false,
      invitSent: false,
      deleteStudentModal: false,
      dataRules: [
        v => !!v || 'veuillez remplir tous les champs.',
      ],
      fileName: {
        editFile: false,
        newName: "",
        oldname: "",
        format: "",
        key: "",
      },
      waitForEdit: false,
      wantsToEdit: false,
      isLoad: false,
      file: null,
      information: null,
      dialog: false,
      urlArray: [],
      deleteModal: false,
      isConfirmed: false,
      editedIndex: -1,
      deleteItem: null,
      model: null,
      viewImage: false,
      viewItem: null,
      editInfo: {
        Email: '',
        Faculty: '',
        Firstname: '',
        Lastname: '',
        Class: '',
        Promotion: '',
        Phone : '',
        Notes : ''
      }
    }
  },
  computed: {
    campuses() {
      return this.$store.state.auth.campuses?.filter(item => item !== "Tous") || []
    },
    promo() {
      return this.$store.state.auth.promo?.filter(item => item !== "Tous") || []
    },
    faculty() {
      return this.$store.state.auth.faculty?.filter(item => item !== "Tous") || []
    },
    classe() {
      return this.$store.state.auth.class?.filter(item => item !== "Tous") || []
    },

  },
  async mounted() {
    try {
      this.isLoad = true
      //get student information
      const id = this.$route.params.id
      const token = this.$store.state.auth.token || localStorage.getItem("token")
      const response = await axios.get(`admin/student?id=${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })

      this.information = response.data

      this.editInfo = {
        ...response.data.Student,
      }

      this.editInfo.Promotion = parseInt(this.editInfo.Promotion)
      this.information.Student.Promotion = parseInt(this.information.Student.Promotion)
      //get student document
      const image = await axios.get(`admin/student/files?id=${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })

      if (image.data) {
        this.urlArray = [...image.data]
      }
      this.isLoad = false
    } catch (e) {
      if (!e.response) {
        return await this.$router.push("/")
      }
      if (e.response.status === 500) {
        await this.$router.push("/server-error");
      }
      if (e.response.status === 401) {
        alert("Votre session à expiré")
        await this.$router.push("/");
      }
      if (e.response.status === 403) {
        alert("Vous n'avez pas accés à ces ressources")
        await this.$router.push("/")
      }

    }
  },
  methods: {
    async sendInvitation() {
      if (this.invitSent) return
      try {
        this.waitForEdit = true
        const id = this.$route.params.id;
        await axios.post(`admin/send-invitation/${id}`, {}, {
          headers: {
            "x-auth-token": this.$store.state.auth.token || localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        this.invitSent = true
        this.waitForEdit = false
      } catch (e) {
        this.invitSent = false
        this.waitForEdit = false
        alert(e);
      }
    },
    openDeleteStudent() {
      this.deleteStudentModal = true;
    },
    async deleteStudentConfirm() {
      try {
        this.waitForEdit = true
        const id = this.$route.params.id;
        await axios.delete(`/admin/student/${id}`, {
          headers: {
            "x-auth-token": this.$store.state.auth.token,
            "Content-Type": "application/json",
          },
        })
        this.waitForEdit = false;
        this.deleteStudentModal = false;
        this.$router.go(-1)
      } catch (e) {
        this.waitForEdit = true;
        this.deleteStudentModal = false;
        alert(e);
      }
    },
    async updateStudent() {
      if (this.wantsToEdit) {
        if (JSON.stringify(this.editInfo) === JSON.stringify(this.information.Student)) {
          this.wantsToEdit = false;
          return
        }

        for (const [key, value] of Object.entries(this.editInfo)) {
          if (key === "Password" || key === "Notes") {
            continue
          }
          if (value === "") {
            alert("Veuillez saisir tous les champs requis")
            return
          }
        }

        try {
          this.waitForEdit = true
          const id = this.$route.params.id
          const data = {
            ...this.editInfo,
            Promotion: this.editInfo.Promotion.toString()
          }

          delete data.Password;
          await axios.put(`/admin/student?id=${id}`, data, {
            headers: {
              "x-auth-token": this.$store.state.auth.token,
              "Content-Type": "application/json",
            },
          })
          this.information.Student = {
            ...this.editInfo,
          }
          this.waitForEdit = false;
          this.wantsToEdit = false
        } catch (e) {
          this.waitForEdit = false
          alert(e);
        }
      } else {
        this.wantsToEdit = true
      }
    },
    getColor(status) {
      if (status === false) return 'red'
      else return 'green'
    },
    visualizer(key) {
      this.editedIndex = this.urlArray.indexOf(key)
      this.viewItem = Object.assign({}, key);
      if (this.viewItem.Key.split('.').pop() !== 'pdf') {
        this.viewImage = true
      } else {
        const link = document.createElement('a')
        link.href = this.viewItem.Url;
        window.open(this.viewItem.Url, 'name');
      }
    },
    downloadImage(key) {
      if (key.Key.split('.').pop() === 'pdf') {
        this.visualizer(key)
      } else {
        let link = document.createElement('a');
        link.href = key.Url
        link.download = key.Key;
        link.click();
      }
    },
    async deleteObject(key) {
      this.editedIndex = this.urlArray.indexOf(key)
      this.deleteModal = true
      this.deleteItem = Object.assign({}, key)
    },
    async deleteItemConfirm() {
      const key = this.deleteItem.Key
      this.deleteModal = false
      try {
        this.waitForEdit = true;
        const id = this.$route.params.id
        await axios.delete(`/admin/student/file?id=${id}&file=${key}`, {
          headers: {
            "x-auth-token": this.$store.state.auth.token,
          },
        })
        this.urlArray.splice(this.editedIndex, 1)
        this.waitForEdit = false
      } catch (e) {
        this.waitForEdit = false
        alert(e)
      }
    },
    async uploadFile() {
      const token = this.$store.state.auth.token || localStorage.getItem("token")
      let formData = new FormData()
      formData.append('file', this.file);
      const type = formData.get("file").type
      try {
        const id = this.$route.params.id
        this.waitForEdit = true;
        this.dialog = false
        await axios.post(`/admin/student/file?id=${id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "data-type": type,
                "x-auth-token": token,

              }
            }
        )

        const image = await axios.get(`admin/student/files?id=${id}`, {
          headers: {
            "x-auth-token": token
          },
        })
        if (image.data.length > 0) {
          this.urlArray = [...image.data]
        }
        this.file = ''
        this.waitForEdit = false;

      } catch (e) {
        this.waitForEdit = false;
        alert(e)
      }
    },
    fillNewName(file) {
      this.editedIndex = this.urlArray.indexOf(file)
      this.fileName.newName = file.Name
      this.fileName.editFile = true
      this.fileName.oldname = file.Name
      const format = file.Name.split(".")
      this.fileName.format = format[1]
    },
    async editNameFile() {
      var re = /(?:\.([^.]+))?$/;
      if (this.fileName.newName === this.fileName.oldname) {
        this.fileName.editFile = false
        return
      }

      let ns = this.fileName.newName
      if (re.exec(this.fileName.newName)[1] !== this.fileName.format) {
        ns = this.fileName.newName + "." + this.fileName.format
      }

      try {
        this.waitForEdit = true;
        this.fileName.editFile = false
        const token = this.$store.state.auth.token || localStorage.getItem("token")
        await axios.put(`admin/student/file?id=${this.$route.params.id}`, {
          newname: ns,
          oldname: this.fileName.oldname
        }, {
          headers: {
            "x-auth-token": token
          },
        })
        this.urlArray[this.editedIndex].Name = ns
        this.waitForEdit = false;
        this.fileName.editFile = false
        this.fileName.oldname = ns
      } catch (e) {
        this.waitForEdit = false;
        if (e.response.data === "object name conflict\n") {
          this.bottomSheet = true;
        } else {
          alert(e)
        }

      }
      //http://0.0.0.0:8083/api/v1/admin/student/file/6113978dd3d1901471a9a091

    }
  }
}

</script>

<style scoped>

</style>

