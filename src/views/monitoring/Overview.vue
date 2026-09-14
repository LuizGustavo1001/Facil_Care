<template>
  <div v-if="currentItem">
    <h2>Item selecionado: {{ currentItem.id }}</h2>
  </div>

  <div v-else>
    <p>Monitoramento não encontrado...</p>
  </div>
</template>

<style scoped>


</style>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { monitoringView } from "../../locales/projectConfig.js"

const route = useRoute()

//
const currentItem = computed(() => {
  const monitoringId = route.params.monitoringId

  // try to find the item that matches the id
  return monitoringView.items.find(item => item.id === monitoringId)
})
</script>