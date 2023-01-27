<template>
  <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="pa-3"
  >
    <v-skeleton-loader
        class="mx-auto"

        type="table-tbody"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name: "SkeletonTables",
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
}
</script>

<style scoped>

</style>