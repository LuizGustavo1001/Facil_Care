<template>
  <transition name="popup-fade" mode="out-in">
    <!-- App Popup Template -->
    <div
      v-if="isOpen"
      :ref="popupRef"
      class="popup fixed flex flex-column gap-1 overflow-auto"
    >
      <!-- Header -->
      <header
        v-if="$slots.header"
        class="popup-header"
      >
        <slot name="header" />
      </header>

      <!-- Main -->
      <div
          v-if="$slots.main"
          class="popup-main flex flex-column gap-1" >
        <slot name="main" />
      </div>

      <!-- Footer -->
      <template v-if="$slots.footer">
        <slot name="footer" />
      </template>
    </div>
  </transition>
</template>

<style scoped>
  .popup {
    z-index: 10;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    max-width: 90dvw;
    max-height: 90dvh;

    padding: var(--spacing-lg);
    border-radius: var(--radius-xl);
    background: var(--color-bg-primary);

    box-shadow: 0 0 10px 2px var(--color-shadow-subtle);
  }

  .popup-fade-enter-active,
  .popup-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .popup-fade-enter-from,
  .popup-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(80%);
  }
</style>

<script setup lang="ts">
  import type { Ref } from "vue"
  import type { DOMReference } from "../../../types/components/appPopup"

  interface Props {
    isOpen: boolean
    popupRef: Ref<DOMReference>
  }

  defineProps<Props>()
</script>