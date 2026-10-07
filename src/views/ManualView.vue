<template>
  <div class="view regular">
    <AppHeader
        :title="utils.getPageTitle(PAGES['USER_MANUAL'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular gap-1">
      <section class="main-section regular gap-05"></section>
    </main>

    <AppFooter page="manual" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { PAGES } from "../locales/projectConfig.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const navigation = useNavigation()
  const utils = useUtils()
</script>