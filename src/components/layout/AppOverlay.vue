<template>
  <transition name="fade" mode="out-in">
    <div
        v-if="isActive"
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
  import { useOverlay } from "../../composables/useOverlay.js"

  const { isActive } = useOverlay()
</script>
