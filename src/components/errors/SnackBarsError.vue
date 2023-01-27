<template>
  <div class="text-center">
    <v-btn
        dark
        color="orange darken-2"
        @click="snackbar = true"
    >
      Une erreur s'est produite
    </v-btn>

    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBarsError",
  data: () => ({
    snackbar: false,
    text: 'My timeout is set to 2000.',
    timeout: 2000,
  }),
}
</script>

<style scoped>

</style>