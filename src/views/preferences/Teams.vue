<template>
  <v-card>
    <v-card-text>
      <div style="margin-top: 20px">

        <v-row justify="center">
          <v-col sm="12" lg="9" md="12">
            <v-data-table
                :headers="teams"
                :items="members"
                sort-by="calories"
                class="elevation-1"
            >
              <template v-slot:item.active="{ item }">
                <v-chip
                    :color="getColor(item)"
                    dark
                >
                  <v-icon
                      v-if="item.active === true"
                      color="white"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <v-icon
                      v-if="item.active === false"
                      color="white"
                  >
                    mdi-cancel
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>Equipe</v-toolbar-title>
                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-spacer></v-spacer>

                  <v-dialog
                      v-model="dialog"
                      max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          v-if="role === 'super'"
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                      >
                        Ajouter
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="12"
                            >
                              <v-text-field
                                  v-model="editedItem.lastname"
                                  label="Nom"
                                  v-show="editedIndex === -1"
                                  :rules="dataRules"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="12"
                            >
                              <v-text-field
                                  v-show="editedIndex === -1"
                                  v-model="editedItem.firstname"
                                  :rules="dataRules"
                                  label="Prénom"

                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="12"
                            >
                              <v-text-field
                                  v-model="editedItem.credentials.email"
                                  label="Email"
                                  v-show="editedIndex === -1"
                                  :rules="dataRules"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="12"
                            >
                              <v-select
                                  v-model="editedItem.role"
                                  :rules="dataRules"
                                  :items="items"
                                  filled
                                  label="Rôle"
                                  dense
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="close"
                        >
                          Annuler
                        </v-btn>
                        <v-btn
                            color="primary darken-1"
                            text
                            @click="save"
                        >
                          Enregistrer
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5 red--text">
                        Attention
                      </v-card-title>
                      <v-card-text>Voulez vous supprimer cette utilisateur ?</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="darken-1"
                            text
                            @click="closeDelete"
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
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <p>Aucun compte</p>
              </template>
            </v-data-table>


          </v-col>
        </v-row>
      </div>
    </v-card-text>
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
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dataRules: [
      v => !!v || 'veuillez remplir tous les champs.',
    ],
    waitForEdit: false,
    isReadonly: false,
    dialog: false,
    dialogDelete: false,
    teams: [
      {
        text: 'Email',
        align: 'start',
        value: 'credentials.email',
      },
      {text: 'Nom', value: 'lastname'},
      {text: 'Prénom', value: 'firstname'},
      {text: 'Role', value: 'role'},
      {text: 'Campus', value: 'campuses'},
      {text: 'Status', value: 'active'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    items: ['admin', 'super'],
    members: [],
    editedIndex: -1,
    editedItem: {
      firstname: '',
      lastname: '',
      role: '',
      credentials: {
        email: ''
      }
    },
    defaultItem: {
      firstname: '',
      lastname: '',
      role: '',
      credentials: {
        email: ''
      }
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nouveau membre' : 'Modification du rôle'
    },
    isReadonly() {
      return this.editedIndex !== -1
    },
    role() {
      return this.$store.state.auth.user.role;
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    await this.getListAdmin()
  },

  methods: {
    getColor(active) {
      if (active.active === false) return 'red'
      else return 'green'
    },
    async getListAdmin() {
      this.members = await this.$store.dispatch('GetAdminList')

    },
    async editItem(item) {

      this.editedIndex = this.members.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.members.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const id = this.members.splice(this.editedIndex, 1)
      try {
        this.waitForEdit = true
        await axios.delete(`admin/admin/${id[0]._id}`, {
          headers: {
            "x-auth-token": this.$store.state.auth.token,
          },
        })
        this.waitForEdit = false;
      } catch (e) {
        this.waitForEdit = false;
        alert(e)
      }
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {

      if (this.editedIndex > -1) {
        try {
          this.waitForEdit = true
          await axios.post(`admin/management/role/${this.editedItem._id}?r=${this.editedItem.role}`, null, {
            headers: {
              "x-auth-token": this.$store.state.auth.token || localStorage.getItem("token"),
              "content-type": "application/json"
            },
          })
          Object.assign(this.members[this.editedIndex], this.editedItem)
          this.waitForEdit = false;
        } catch (e) {
          this.waitForEdit = false;
          alert(e)
        }
      } else {
        try {
          let save = false
          const checkValue = Object.values(this.editedItem)
          checkValue.forEach((v) => {
            if (v === null || v === "") {
              save = true
            }
          })
          if (save) {
            alert("Veuillez remplir tous les champs")
            return
          }
          this.waitForEdit = true
          const body = {
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            credentials: {
              email: this.editedItem.credentials.email,
              password: null
            },
            role: this.editedItem.role,
            campuses: [this.$store.state.auth.user.campus],
            school: this.$store.state.auth.school
          }
          await axios.post(`/auth/register/admin`, body, {
            headers: {
              "x-auth-token": this.$store.state.auth.token,
              "Content-Type": "application/json"
            },
          })
          this.members.push({
            ...body,
            campuses: this.$store.state.auth.user.campus,
            firstName: this.editedItem.firstname,
            lastName: this.editedItem.lastname,
            active: false
          })
          this.waitForEdit = false;
        } catch (e) {
          this.waitForEdit = false;
          if (e.response.status === 403) {
            alert(e.response.data)
            return
          }
          alert(e)
          console.log(e);
        }
      }
      this.close()
    },
  },
}
</script>
<style scoped>

</style>