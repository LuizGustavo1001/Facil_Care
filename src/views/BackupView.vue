<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppHeader
        :title="getPageTitle(itemId)"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <!-- Export Page -->
      <template v-if="itemId === 'export'">
        <section class="export-page">
          <p>QR Code here...</p>
        </section>
      </template>

      <!-- Import Page -->
      <template v-else>
        <section class="import-page">
          <p>Import options here...</p>
        </section>
      </template>
    </main>

    <AppFooter page="backup" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useWarning } from "../composables/useWarning.js"

  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  // COMPOSABLES
  const route = useRoute()
  const { warning } = useWarning()
  const { handleReturn } = useNavigation()
  const { getPageTitle } = useUtils()

  // COMPUTED PROPERTIES
  // Retrieve page data
  const itemId = computed(() => route.params.backupId)
</script>