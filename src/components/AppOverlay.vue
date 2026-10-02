<template>
  <div
      v-if="isOverlayActive"
      class="overlay fixed"
      :class="isOverlayActive ? 'active' : ''"
  />
</template>

<style scoped>
  .overlay {
    display: none;
    background: var(--color-shadow-strong);
    width: 100dvw;
    height: 100dvh;

    z-index: 9;
  }

  .overlay.active{
    display: block;
  }
</style>

<script setup>
  import { useOverlay } from "../composables/useOverlay.js"

  const { isOverlayActive } = useOverlay()
</script>
