<template>
  <div>
    <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="primary"
        hide-no-data
        outlined
        item-text="Description"
        item-value="Email"
        label="Recherche"
        placeholder="Rechercher un étudiant"
        prepend-icon="mdi-account-search"
        return-object
    >
      <template v-slot:item="{ item }">
        <v-list-item-content @click="redirectToStudent(item.Id)">
          <v-list-item-title v-text="item.Email"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-eye</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }
  },
  methods: {
    redirectToStudent(i) {
      this.$router.push({
        name: "student",
        params: {id: i},
      });
    }
  },
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries?.filter(v => v).map(entry => {
        const Description = entry.Email
        return Object.assign({}, entry, {Description})
      })
    },
  },


  watch: {
    search(val) {

      //dont send white space nor activate the function if user writes nothing
      if (!val || !val.trim()) return;
      if (this.isLoading) return

      this.isLoading = true

      axios.get(`/admin/student/search?email=${val}`, {
        headers: {
          "x-auth-token": this.$store.state.auth.token,
        },
      })
          .then(res => {
            console.log(res)
            this.entries = res.data || []
          })
          .catch(err => console.log(err))
          .finally(() => (this.isLoading = false))

    },

  },
}
</script>

<style scoped>

</style>

