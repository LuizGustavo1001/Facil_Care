<template>
  <div class="view regular">
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

<script setup>
  import { useI18n } from "vue-i18n"

  import ActionButton from "../components/buttons/ActionButton.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const { t } = useI18n()

  // FUNCTIONS
  const getFallbackMessage = () => {
    return t(`utils.pageFallback.title`)
  }

  const getFallbackBtnMessage = () => {
    return t(`utils.pageFallback.button`)
  }
</script>