<template>
  <div v-if="currentItem">
    <h2>Item selecionado: {{ currentItem.id }}</h2>
  </div>

  <div v-else>
    <p>Sinal vital não encontrado...</p>
  </div>
</template>

<style scoped>


</style>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { vitalSignsView } from "../../locales/projectConfig.js"

const route = useRoute()

//
const currentItem = computed(() => {
  const vitalSignId = route.params.vitalSignId

  // try to find the item that matches the id
  return vitalSignsView.items.find(item => item.id === vitalSignId)
})
</script>