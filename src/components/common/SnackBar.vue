<template>
  <div
      class="snackbar flex gap1 justify-between cursor-pointer active-border absolute"
      :class="props.type"
      @click="$emit('close')"
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

    <Icon :icon="icons.close" class="right-icon" />
  </div>
</template>

<style scoped>
  .snackbar{
    padding: var(--spacing-md);

    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);

    width: 90dvw;
    max-width: 450px;

    border-radius: var(--radius-md);
    font-size: var(--text-body-lg);

    animation: fade-in 0.5s ease-out forwards;

    z-index: 10;
  }
  .snackbar:active{
    transform: scale(0.98) translateX(-50%);
  }

  .snackbar .right-icon{
    align-self: start;
  }

  /* VARIANTS */
  /* 1. success */
  .snackbar.success{
    background: var(--green-100);
    color: var(--green-500);
  }

  /* 2. error */
  .snackbar.error{
    background: var(--red-100);
    color: var(--red-500);
  }

  /* 3. warning */
  .snackbar.warning{
    background: var(--orange-100);
    color: var(--orange-500);
  }

  /* 4. info */
  .snackbar.info{
    background: var(--blue-100);
    color: var(--blue-500);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"
  import { useI18n } from "vue-i18n"

  import Icon from "./Icon.vue"

  const INTERVAL = 5000

  const props = defineProps({
    message: String,
    type: {
      type: String,
      default: 'success'
    }
  })

  // close snackbar event
  const emit = defineEmits(["close"])

  // interval to auto close snackbar
  setInterval(() => {
    emit("close")
  }, INTERVAL)
</script>