<template>
  <div class="view">
    <AppHeader
        :title="getPageTitle(PAGES['USER_MANUAL'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <section></section>
    </main>

    <AppFooter page="manual" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  // Composables
  const { handleReturn } = useNavigation()
  const { getPageTitle, PAGES } = useUtils()
</script>