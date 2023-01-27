<template>
  <div>
    <div v-if="isLoad === false">
      <v-container fluid>
        <v-card>
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
              <v-col sm="2" lg="2" xl="2" md="2">
                <br/>
                <v-avatar
                    class="profile"
                    color="white"
                    size="190"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                       width="24" height="24"
                       viewBox="0 0 172 172"
                       style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                       stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                       font-family="none" font-weight="none" font-size="none" text-anchor="none"
                       style="mix-blend-mode: normal">
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#473bf0">
                        <path
                            d="M86,6.90688c-43.65602,0 -79.12,35.46398 -79.12,79.12c0,43.65603 35.46397,79.12 79.12,79.12c43.65603,0 79.12,-35.46397 79.12,-79.12c0,-43.65602 -35.46398,-79.12 -79.12,-79.12zM86,13.78688c39.93779,0 72.24,32.3022 72.24,72.24c0,19.72048 -7.89824,37.55807 -20.68031,50.58547c-6.29445,-4.62102 -13.9672,-6.93955 -20.46531,-9.25172c-3.65971,-1.30221 -6.95021,-2.59266 -9.3525,-4.03125c-2.3007,-1.37776 -3.57837,-2.79361 -4.25297,-4.42094c-0.31596,-3.9452 -0.25197,-7.12133 -0.22844,-10.87094c0.41676,-0.41506 0.95142,-0.70667 1.37735,-1.20937c1.00444,-1.18553 2.02714,-2.62612 3.00328,-4.24625c1.67386,-2.77815 2.89186,-6.17617 3.57437,-9.62125c1.04222,-0.53127 2.15558,-0.64624 3.00328,-1.72672c1.56511,-1.99488 2.62165,-4.80225 3.09062,-8.71422c0.41587,-3.45393 -0.69696,-5.8295 -2.12984,-7.65265c1.54149,-5.03898 3.44997,-13.0525 2.80172,-21.34547c-0.35663,-4.56249 -1.50468,-9.15496 -4.2664,-12.97391c-2.63665,-3.64599 -6.91734,-6.2668 -12.3961,-7.21594c-3.47976,-3.95076 -9.00737,-5.81172 -15.61438,-5.81172h-0.03359h-0.02688c-14.80144,0.27174 -24.35153,6.39785 -28.44047,15.74203c-3.8882,8.88544 -3.05232,19.94718 -0.26203,31.4639c-1.49993,1.82328 -2.6749,4.24418 -2.25078,7.79375c0.47074,3.91065 1.52668,6.71918 3.09062,8.71422c0.84708,1.08057 1.96057,1.19515 3.00328,1.72672c0.68241,3.44239 1.90065,6.8358 3.57437,9.61453c0.97614,1.6206 1.99779,3.05975 3.00328,4.24625c0.42603,0.50272 0.96009,0.80079 1.37735,1.2161c0.02236,3.74764 0.08591,6.92253 -0.22844,10.87094c-0.67328,1.62133 -1.94926,3.03793 -4.24625,4.42094c-2.39848,1.44412 -5.68503,2.74173 -9.33906,4.05141c-6.49125,2.32659 -14.15968,4.66176 -20.47203,9.245c-12.7899,-13.02857 -20.69375,-30.87159 -20.69375,-50.59891c0,-39.93779 32.30221,-72.24 72.24,-72.24zM85.73125,34.40672c6.34379,0.00654 10.33515,1.88481 11.4286,3.80281l0.83984,1.4714l1.67297,0.22844c4.32126,0.60044 6.73568,2.27734 8.46563,4.66953c1.72995,2.39219 2.69004,5.73073 2.98312,9.48016c0.58618,7.49885 -1.5604,16.35397 -2.92265,20.45187l-0.86672,2.60016l2.34484,1.42437c-0.23853,-0.14524 1.10247,0.64855 0.79953,3.16453c-0.36694,3.06091 -1.14913,4.61998 -1.67297,5.28765c-0.52383,0.66768 -0.74808,0.5824 -0.69203,0.57781l-2.83531,0.23516l-0.30235,2.82859c-0.25948,2.43024 -1.62635,5.74511 -3.225,8.39844c-0.79933,1.32666 -1.64976,2.50848 -2.365,3.35266c-0.71524,0.84418 -1.47694,1.36705 -1.18922,1.21609l-1.84094,0.96078v2.08281c0,4.55566 -0.1856,8.28108 0.29562,13.58531l0.04031,0.45687l0.16125,0.43c1.35375,3.6431 4.17952,6.21342 7.35703,8.11625c3.1775,1.90283 6.82296,3.27822 10.58203,4.61578c6.19529,2.20442 12.65343,4.3738 17.57625,7.57875c-12.54323,10.50618 -28.69975,16.8439 -46.3661,16.8439c-17.65951,0 -33.81147,-6.3316 -46.35265,-16.83047c4.95077,-3.18656 11.41854,-5.36207 17.60312,-7.57875c3.75659,-1.34643 7.3925,-2.72767 10.56188,-4.63594c3.16938,-1.90827 5.98504,-4.47816 7.33687,-8.10953l0.16125,-0.43l0.04031,-0.45687c0.47728,-5.30014 0.29562,-9.02625 0.29562,-13.58531v-2.08281l-1.84094,-0.9675c0.2881,0.15071 -0.47374,-0.37181 -1.18922,-1.21609c-0.71548,-0.84428 -1.56567,-2.01889 -2.365,-3.34594c-1.59865,-2.65409 -2.96562,-5.9716 -3.225,-8.39844l-0.30235,-2.82859l-2.83531,-0.23516c0.05315,0.00447 -0.16877,0.08972 -0.69203,-0.57781c-0.52328,-0.66751 -1.30436,-2.22543 -1.67297,-5.28765c-0.30069,-2.5165 1.05536,-3.31997 0.79953,-3.16453l2.18359,-1.3236l-0.63828,-2.47922c-2.95996,-11.39227 -3.40757,-21.75796 -0.36281,-28.71594c3.04175,-6.9511 9.13485,-11.36116 22.22562,-11.61z"></path>
                      </g>
                    </g>
                  </svg>
                </v-avatar>

              </v-col>
              <v-col sm="10" lg="10" xl="10" md="10" v-if="wantsToEdit === false">
                <v-list color="transparent">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-account
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.lastname }} {{ information.firstname }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-email
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.credentials.email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ information.school.charAt(0).toUpperCase() + information.school.slice(1) }},
                        {{ information.campus }}
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
                      <v-list-item-title>{{ information.faculty }}, {{ information.promo }}</v-list-item-title>
                      <v-list-item-subtitle>{{ information.class }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col v-if="wantsToEdit === true">
                <br/>
                <v-row>
                  <v-col sm="12" lg="3" md="4" xs="12">
                    <v-text-field
                        v-model="editInfo.lastname"
                        label="Nom"
                        filled
                        required="true"
                        :rules="dataRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="editInfo.firstname"
                        label="Prénom"
                        filled
                        :rules="dataRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="editInfo.credentials.email"
                        label="Email"
                        filled
                        :rules="dataRules"
                    ></v-text-field>
                    <v-select
                        v-model="editInfo.faculty"
                        :items="faculty"
                        filled
                        label="Spécialité"
                        :rules="dataRules"
                    ></v-select>
                    <v-select
                        v-model="editInfo.campus"
                        :items="campuses"
                        filled
                        label="Campus"
                        :rules="dataRules"
                    ></v-select>
                    <v-select
                        v-model="editInfo.class"
                        :items="classe"
                        filled
                        label="Classe"
                        :rules="dataRules"
                    ></v-select>
                    <v-select
                        v-model="editInfo.promo"
                        :items="promo"
                        filled
                        label="Année"
                        :rules="dataRules"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="my-2">
                      <v-btn
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
                  nouveau document
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Télécharger un fichier</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          sm="12"
                      >
                        <v-file-input
                            accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                            label="File input"
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
                        @click="fillNewName(file.Name)"
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
        <v-dialog v-model="fileName.editFile" width="500"
        >
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
                Envoyer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>

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
      invitSent: false,
      deleteStudentModal: false,
      dataRules: [
        v => !!v || 'veuillez remplir tous les champs.',
      ],
      fileName: {
        editFile: false,
        newName: "",
        oldname: "",
        format: ""
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
        campus: '',
        credentials: {
          email: ''
        },
        faculty: '',
        firstname: '',
        lastname: '',
        class: '',
        promo: ''
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
      const response = await axios.get(`admin/student/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      this.information = response.data;
      this.editInfo = {
        ...response.data,
      }
      this.editInfo.promo = parseInt(this.editInfo.promo)
      //get student document
      const image = await axios.get(`admin/student/file/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      if (image.data) {
        this.urlArray = [...image.data]
      }
      this.isLoad = false
    } catch (e) {
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
      if (!e.response) {
        return await this.$router.push("/");
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
        console.log(e);
        this.waitForEdit = true;
        this.deleteStudentModal = false;
        alert(e);
      }
    },
    async updateStudent() {
      let save = false;

      if (this.wantsToEdit) {
        if (JSON.stringify(this.editInfo) === JSON.stringify(this.information)) {
          this.wantsToEdit = false;
          return
        }
        const checkValue = Object.values(this.editInfo)
        checkValue.forEach((v) => {
          if (v === null || v === "") {
            save = true
          }
        })
        if (save) {
          alert("Veuillez saisir tous les champs requis !")
          return
        }
        this.waitForEdit = true
        const id = this.$route.params.id
        try {
          const schoolTmp = this.information.school;
          const data = {
            ...this.editInfo,
            promo: this.editInfo.promo.toString()
          }

          delete data._id;
          delete data.active;
          delete data.school;
          delete data.active;
          await axios.put(`/admin/student/${id}`, data, {
            headers: {
              "x-auth-token": this.$store.state.auth.token,
              "Content-Type": "application/json",
            },
          })
          this.information = {
            ...this.editInfo,
            school: schoolTmp
          }
          this.waitForEdit = false;
          this.wantsToEdit = false
        } catch (e) {
          console.log(e);
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
      try {
        this.waitForEdit = true;
        const id = this.$route.params.id
        await axios.delete(`/admin/student/file/${id}?d=${key}`, {
          headers: {
            "x-auth-token": this.$store.state.auth.token,
          },
        })
        this.urlArray.splice(this.editedIndex, 1)
        this.waitForEdit = false
        this.deleteModal = false
      } catch (e) {
        this.deleteModal = false
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
        await axios.post(`/admin/student/file/${id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "data-type": type,
                "x-auth-token": token,

              }
            }
        )
        const image = await axios.get(`admin/student/file/${id}`, {
          headers: {
            "x-auth-token": token
          },
        })
        if (image.data.length > 0) {
          this.urlArray = [...image.data]
        }
        this.file = ''
        this.waitForEdit = false;
        this.dialog = false
      } catch (e) {
        this.waitForEdit = false;
        alert(e)
      }
    },
    fillNewName(name) {
      console.log(name)
      this.fileName.newName = name
      this.fileName.editFile = true
      this.fileName.oldname = name
      const format = name.split(".")
      this.fileName.format = format[1]
    },
    async editNameFile() {
      console.log(this.fileName)
      if (this.fileName.newName === this.fileName.oldname) {
        this.fileName.editFile = false
        return
      }
      const ns = this.fileName.newName + "." + this.fileName.format
      try {
        const token = this.$store.state.auth.token || localStorage.getItem("token")
        await axios.put(`admin/student/file/${this.$route.params.id}`, {
          newname: ns,
          oldname: this.fileName.oldname
        }, {
          headers: {
            "x-auth-token": token
          },
        })
      } catch (e) {
        console.log(e)
        alert(e)
      }
      //http://0.0.0.0:8083/api/v1/admin/student/file/6113978dd3d1901471a9a091

    }
  }
}

</script>

<style scoped>

</style>

