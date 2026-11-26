<template>
  <transition name="snackbar-transition" mode="out-in">
    <!-- Snackbar -->
    <div
        v-if="isActive"
        class="snackbar flex gap-1 align-center justify-between cursor-pointer active-border fixed tap-highlight"
        :class="props.type"
    >
    <span class="flex gap-05 align-center flex-grow-1">
      <Icon
          :icon="icons['warning-circle-fill']"
          size="25px"
      />

      <span class="snackbar-text flex-grow-1">
        <slot name="message">{{ props.message }}</slot>
      </span>
    </span>

      <Icon
          :icon="icons.close"
          class="right-icon"
          style="align-self: flex-start;"
      />
    </div>
  </transition>
</template>

<style scoped>
  .snackbar {
    padding: var(--spacing-md);

    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);

    width: 90dvw;
    max-width: 450px;

    border-radius: var(--radius-md);
    font-size: var(--font-error);

    z-index: 12;
  }

  .snackbar-transition-enter-active,
  .snackbar-transition-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .snackbar-transition-enter-from,
  .snackbar-transition-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(80%);
  }

  /* VARIANTS */
  /* 1. Success */
  .snackbar.success {
    background: var(--color-bg-green);
    color: var(--color-text-green);
  }

  /* 2. Error */
  .snackbar.error {
    background: var(--color-bg-red);
    color: var(--color-text-red);
  }

  /* 3. Warning */
  .snackbar.warning {
    background: var(--color-bg-orange);
    color: var(--color-text-orange);
  }

  /* 4. Info */
  .snackbar.info {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
</style>

<script setup lang="ts">
  import { icons } from "../../assets/icons/icons"
  import { SNACKBAR_TYPES } from "../../constants/components/appSnackbar"
  import type { SnackbarType } from "../../types/components/snackbar"

  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    message?: string | null
    type?: SnackbarType | string
    isActive: boolean
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    message: null,
    type: SNACKBAR_TYPES.SUCCESS
  })
</script>