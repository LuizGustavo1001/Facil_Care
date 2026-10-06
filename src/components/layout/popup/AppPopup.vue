<template>
  <transition name="fade-bounce" mode="out-in">
    <div
      v-if="isOpen"
      :ref="popupRef"
      class="popup fixed flex flex-column gap-1 overflow-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <header
        v-if="$slots.header"
        class="popup-header"
      >
        <slot name="header"></slot>
      </header>

      <!-- Main -->
      <div
          v-if="$slots.main"
          class="popup-main flex flex-column gap-1" >
        <slot name="main"></slot>
      </div>

      <!-- Footer -->
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
    </div>
  </transition>
</template>

<style scoped>
  .popup{
    z-index: 10;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    max-width: 90dvw;
    max-height: 90dvh;

    padding: var(--spacing-md);
    border-radius: var(--radius-xl);
    background: var(--color-bg-primary);

    box-shadow: 0 0 10px 2px var(--color-shadow-subtle);
  }
</style>

<script setup>
  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    popupRef: {
      type: Object,
      required: true
    }
  })
</script>