<template>
  <v-container>
    <v-row fill-height>
      <v-col>
        <h1>Erreur du server</h1>
        <p>Le server à été victime d'une erreur interne et n'a pas été capable de faire aboutir votre requête.</p>
        <p>Nous travaillons pour résoudre le problème rapidement...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ServerError"
}
</script>

<style scoped>

</style>