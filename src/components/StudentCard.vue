<template>
  <v-card
      class="mx-auto"
      max-width="400"
      max-height="250"
      @click="linkStudentPage"
  >
    <v-list-item>
      <v-list-item-content>
        <v-row>
          <v-col>
            <v-list-item-title>
              <div class="text-overline mb-0">
                {{ student.item.school }}
              </div>
            </v-list-item-title>
          </v-col>
          <v-col class="text-overline mb-0 text-right">
            <v-bottom-sheet v-model="sheet">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-1" v-bind="attrs"
                       v-on="on" icon>
                  <v-icon color="primary">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-subheader>Open in</v-subheader>
                <v-list-item
                    v-for="tile in tiles"
                    :key="tile.title"
                    @click="sheet = false"
                >
                  <v-list-item-avatar>
                    <v-avatar
                        size="32px"
                        tile
                    >
                      <img
                          :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                          :alt="tile.title"
                      >
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-title>{{ tile.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-bottom-sheet>
          </v-col>
        </v-row>
        <v-list-item-content>

          <v-list-item-title class="mb-4">
            {{ student.item.credentials.email }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ student.item.campus }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-subtitle>Promo - {{ student.item.promo }}  </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-chip
          :color="getColor(student.item.active)"
          dark
      >
        {{ student.item.active === false ? 'Non vérifié' : 'Validé' }}
      </v-chip>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "StudentCard",
  props: ['student'],
  data: () => ({
    sheet: false,
    tiles: [
      {img: 'keep.png', title: 'Keep'},
      {img: 'inbox.png', title: 'Inbox'},
      {img: 'hangouts.png', title: 'Hangouts'},
      {img: 'messenger.png', title: 'Messenger'},

    ],
  }),
  methods: {
    linkStudentPage() {

      this.$router.push({
        name: "student",
        params: {id: this.student.item._id},
      });
    },
    getColor(status) {
      if (status === false) return 'red'
      else return 'green'
    },
  }
}
</script>

<style scoped>

</style>