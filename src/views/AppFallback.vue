<template>
  <div class="view">
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
  import ActionButton from "../components/common/ActionButton.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  const { t } = useI18n()

  const getFallbackMessage = () => {
    return t(`utils.pageFallback.title`)
  }

  const getFallbackBtnMessage = () => {
    return t(`utils.pageFallback.button`)
  }
</script>