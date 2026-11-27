<template>
  <div class="view regular">
    <!-- FallBack View -->
    <div class="flex align-center justify-center flex-column gap-1" style="height: 100dvh">
      <p class="medium-weight">{{ getFallbackMessage() }}...</p>

      <ActionButton
          :tag="BUTTON_TAGS.ROUTER"
          to="/"
          :title="getFallbackBtnMessage()"
          :padding="BUTTON_PADDING.MEDIUM"
      />
    </div>

    <AppFooter page="fallback" />
  </div>
</template>

<script setup lang="ts">
  import { useUtils } from "../composables/useUtils"
  import { BUTTON_PADDING, BUTTON_TAGS } from "../constants/components/appButtons"

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