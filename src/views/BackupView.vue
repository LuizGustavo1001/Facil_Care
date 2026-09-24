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
      <section>
        <template v-if="itemId === 'export'">
          <p>QR Code here...</p>
        </template>

        <template v-else>
          <p>Import options here...</p>
        </template>
      </section>
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

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  // Composables
  const route = useRoute()
  const { warning } = useWarning()
  const { handleReturn } = useNavigation()
  const { getPageTitle } = useUtils()

  // Retrieve page data
  const itemId = computed(() => route.params.backupId)
</script>