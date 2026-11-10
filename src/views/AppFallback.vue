<template>
  <div class="view regular">
    <!-- FallBack View -->
    <div class="flex align-center justify-center flex-column gap-1" style="height: 100dvh">
      <p>{{ getFallbackMessage() }}...</p>

      <ActionButton
          tag="router"
          to="/"
          :title="getFallbackBtnMessage()"
          padding="lg"
      />
    </div>

    <AppFooter page="fallback" />
  </div>
</template>

<script setup lang="ts">
  import { useUtils } from "../composables/useUtils"

  import ActionButton from "../components/buttons/ActionButton.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const utils = useUtils()

  // FUNCTIONS
  const getFallbackMessage = (): string => {
    const key = `utils.pageFallback.title`

    return utils.getTranslate(key)
  }

  const getFallbackBtnMessage = (): string => {
    const key = `utils.pageFallback.button`

    return utils.getTranslate(key)
  }
</script>