<template>
  <div>
    <v-data-table
        :loading="loading"
        loading-text="Loading... Please wait"
        v-show="isLoad === false"
        :headers="headers"
        :items="items"
        :items-per-page="12"
        class="elevation-1"
        @click:row="GoToStudentPage"
        :page.sync="page"
    >
      <template v-slot:item.level="{ item }">
        bac +{{item.level}}
      </template>
      <template v-slot:item.Active="{ item }">
        <v-chip
            :color="getColor(item.Active)"
            dark
        >
          <v-icon
              v-if="item.Active === true"
              color="white"
          >
            mdi-checkbox-marked-circle
          </v-icon>
          <v-icon
              v-if="item.Active === false"
              color="white"
          >
            mdi-cancel
          </v-icon>
        </v-chip>
      </template>
    </v-data-table>
    <SkeletonTables v-show="isLoad === true"/>
  </div>

</template>

<script>
import SkeletonTables from "../../components/SkeletonTables";

export default {
  components: {
    SkeletonTables
  },
  props : ["items", "loading"],
  name: "DataTables",
  watch: {
    page: function (val) {
     this.$store.commit("getPage", val)
    },
  },
  /*computed : {
    page () {
      console.log(this.$store.state.data.page)
      return this.$store.state.data.page
    }
  },*/
  data() {
    return {
      page : this.$store.state.data.page,
      isLoad: true,
      headers: [
        {
          text: 'Email',
          align: 'start',
          value: 'Email',
        },
        {text: 'Prénom', value: 'Firstname'},
        {text: 'Nom', value: 'Lastname'},
        {text: 'Classe', value: 'Class'},
        {text: 'Spécialité', value: 'Faculty'},
        {text: 'Année', value : 'Promotion'},
        {text: 'Status', value: 'Active'},

      ],
    }
  },
  created() {
    setTimeout(function () {
      this.isLoad = false
    }.bind(this), 2000)

  },
  methods: {
    getColor (status) {
      if (status === false) return 'red'
      else return 'green'
    },
    GoToStudentPage(item) {
      this.$router.push({
        name: "student",
        params: {id: item._id},
      });
    }
  },
}
</script>

<style scoped>

</style>