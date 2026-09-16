<template>
  <div class="view">
    <div class="flex align-center justify-center flex-column gap-1" style="height: 100dvh">
      <p>{{ $t(`utils.pageFallback.title`) }}...</p>

      <ActionButton
          tag="router"
          to="/"
          :title="$t(`utils.pageFallback.button`)"
          padding="lg"
      />
    </div>

    <AppFooter page="fallback" />
  </div>
</template>

<script setup>
  import ActionButton from "../components/common/ActionButton.vue"
  import AppFooter from "../components/common/AppFooter.vue"
</script>