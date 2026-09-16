<template>
  <div class="view">
    <AppHeader
        :title="$t('views.emergencyData.headerTitle')"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="flex flex-column gap-15 relative flex-grow-1">
      <section></section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped>

</style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  // Composables
  const { handleReturn } = useNavigation()
</script>