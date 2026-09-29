<template>
  <div class="view regular">
    <AppHeader
        :title="getPageTitle(PAGES['ERASE'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="main regular">
      <section class="main-section center">
      </section>
    </main>

    <AppFooter page="eraseData" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"

  // COMPOSABLES
  const { handleReturn } = useNavigation()
  const { getPageTitle, PAGES } = useUtils()
</script>