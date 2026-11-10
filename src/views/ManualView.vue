q<template>
  <div class="view regular">
    <!-- System User's Manual View -->
    <AppHeader :title="utils.getPageTitle(PAGES['USER_MANUAL'])" />

    <main class="main regular gap-1">
      <section class="main-section regular gap-05"></section>
    </main>

    <AppFooter :page="PAGES.USER_MANUAL" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { PAGES } from "../constants/sysPages"

  import { useUtils } from "../composables/useUtils"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const utils = useUtils()
</script>