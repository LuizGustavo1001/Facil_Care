<template>
  <div class="overlay fixed"></div>
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

<script setup></script>
