<template>
  <AppHeader
      :title="$t('views.emergencyData.headerTitle')"
      :leftBtnIcon="icons['chevron-left']"
      @return-page="handleReturn"
  />

  <main class="flex flex-column gap-15 relative flex-grow-1">
    <section></section>
  </main>

  <footer class="flex flex-column gap-05">
    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>

</style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"

  import AppHeader from "../components/common/AppHeader.vue"

  // Composables
  const { handleReturn } = useNavigation()
</script>