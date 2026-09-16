<template>
  <div class="view">
    <AppHeader
        :title="$t(`views.${itemId}.headerTitle`)"
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

    <footer>

    </footer>
  </div>
</template>

<style scoped>

</style>

<script setup>
  import {icons} from "../assets/icons/icons.js"
  import AppHeader from "../components/common/AppHeader.vue"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useRoute } from "vue-router"
  import { computed } from "vue"

  const route = useRoute()

  // retrieve page data
  const itemId = computed(() => route.params.backupId)

  // Composables
  const { handleReturn } = useNavigation()
</script>