<template>
  <transition name="fade" mode="out-in">
    <!-- App Overlay -->
    <div
        v-if="isOverlayActive"
        class="overlay fixed"
    />
  </transition>
</template>

<style scoped>
  .overlay {
    background: var(--color-shadow-strong);
    width: 100dvw;
    height: 100dvh;

    z-index: 9;
  }
</style>

<script setup>
  import { computed } from "vue"
  import { useOverlay } from "../../composables/useOverlay.js"

  const overlay = useOverlay()
  const isOverlayActive = computed(() => overlay.isActive.value)
</script>
